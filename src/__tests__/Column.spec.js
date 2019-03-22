import React from "react";
import { render, cleanup, fireEvent, wait } from "react-testing-library";
import "jest-dom/extend-expect";
import App from "../App";
import { testData } from "../utils/buildDummyData";

afterEach(cleanup);

test("Test if we can drag and drop the columns", async () => {
  const { getAllByTestId, getByText, getByTestId, asFragment } = render(
    <App intialData={testData.toJSON()} />
  );

  const titles = getAllByTestId("column-title").map(
    titleNode => titleNode.textContent
  );
  expect(titles).toEqual(testData.getColumnTtitles());
  // console.log(getByText(/droppable=""/))
  expect(asFragment()).toMatchSnapshot();

  const firstTask = getByText(testData.getFirstColumn().title);
  fireEvent.mouseDown(firstTask);
  //   const lastTask = getByText(testData.getLastColumn().title);

  fireEvent.mouseMove(firstTask, {
    button: 0,
    clientX: "480px",
    clientY: "100px"
  });
  fireEvent.mouseUp(firstTask);

  await wait(() => {}, { timeout: 200 });
  const updatedTitles = getAllByTestId("column-title").map(
    titleNode => titleNode.textContent
  );
  console.log(updatedTitles);

  expect(updatedTitles).toEqual(testData.getColumnTtitles());
  expect(asFragment()).toMatchSnapshot();

  //   expect(getAllByTestId("column-title")[0]).t();
});

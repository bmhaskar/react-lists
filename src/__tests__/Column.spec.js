import React from "react";
import { render, cleanup, fireEvent, wait } from "react-testing-library";
import "jest-dom/extend-expect";
import App from "../App";
import { testData } from "../utils/buildDummyData";

afterEach(cleanup);

test("Test if we can drag and drop the columns", async () => {
  const { getAllByTestId, getByText, getByTestId, asFragment } = render(
    <App initialData={testData.toJSON()} />
  );

  const titles = getAllByTestId("column-title").map(
    titleNode => titleNode.textContent
  );
  expect(titles).toEqual(testData.getColumnTittles());
  // console.log(getByText(/droppable=""/))
  expect(asFragment()).toMatchSnapshot();

  const firstTask = getByText(testData.getFirstColumn().title);
  fireEvent.mouseDown(firstTask, {
    button: 0,
    clientX: "70px",
    clientY: "100px"
  });
  //   const lastTask = getByText(testData.getLastColumn().title);

  fireEvent.mouseMove(firstTask, {
    button: 0,
    clientX: "480px",
    clientY: "200px"
  });
  fireEvent.mouseMove(firstTask, {
    button: 0,
    clientX: "580px",
    clientY: "300px"
  });
  fireEvent.mouseUp(firstTask);

  await wait(() => {}, { timeout: 500 });
  const updatedTitles = getAllByTestId("column-title").map(
    titleNode => titleNode.textContent
  );
  console.log(updatedTitles);

  expect(updatedTitles).toEqual(testData.getColumnTittles());
  expect(asFragment()).toMatchSnapshot();

  //   expect(getAllByTestId("column-title")[0]).t();
});

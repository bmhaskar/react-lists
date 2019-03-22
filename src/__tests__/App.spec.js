import React from "react";
import { render, cleanup } from "react-testing-library";
import "jest-dom/extend-expect";
import App from "../App";

import { testData } from "../utils/buildDummyData";

afterEach(cleanup);
test("Test if app renders fine with dummy data", () => {
  const { getAllByTestId } = render(<App intialData={testData.toJSON()} />);
  const titles = getAllByTestId("column-title").map(
    titleNode => titleNode.textContent
  );
  expect(titles).toEqual(testData.getColumnTtitles());
});

test("Test if app renders fine without data", () => {
  const dom = render(<App />);
  expect(dom.container).toBeInTheDocument();
  expect(dom.asFragment()).toMatchSnapshot();
});

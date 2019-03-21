import React from "react";
import "jest-dom/extend-expect";
import { cleanup, render } from "react-testing-library";
import App from "../App";
import intialData from "../intial-data";

afterEach(cleanup);

const buildDummyData = function(intialData) {
  const getFirstColumn = () => {
    return intialData.columns[intialData.columnOrder[0]];
  };
  const toJSON = () => intialData;
  return {
    toJSON,
    getFirstColumn
  };
};
const testData = new buildDummyData(intialData);

test("Test if app renders fine", () => {
  const { getByText } = render(<App intialData={testData.toJSON()} />);
  expect(getByText(testData.getFirstColumn().title)).toBeVisible();
});

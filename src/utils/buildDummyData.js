import intialData from "../intial-data";
const buildDummyData = function(intialData) {
  const getFirstColumn = () => {
    return intialData.columns[intialData.columnOrder[0]];
  };
  const getLastColumn = () => {
    return intialData.columns[
      intialData.columnOrder[intialData.columnOrder.length - 1]
    ];
  };
  const getColumnTitles = () =>
    intialData.columnOrder.map(columnId => intialData.columns[columnId].title);
  const toJSON = () => intialData;
  return {
    toJSON,
    getFirstColumn,
    getColumnTtitles: getColumnTitles,
    getLastColumn
  };
};
export const testData = new buildDummyData(intialData);

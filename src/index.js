import React from "react";
import ReactDOM from "react-dom";
// eslint-disable-next-line
import "@atlaskit/css-reset";
import App from "./App";
import initialData from "./initial-data";
// import './index.css';
// import App from './App';
// import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <App initialData={initialData} />,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();

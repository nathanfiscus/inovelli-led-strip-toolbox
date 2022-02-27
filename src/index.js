import React from "react";
import ReactDOM from "react-dom";
import AppWrapper from "./AppWrapper";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
//import reportWebVitals from './reportWebVitals';
import swConfig from "./swconfig";

ReactDOM.render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorkerRegistration.register(swConfig);

//reportWebVitals();

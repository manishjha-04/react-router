import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter } from "react-router";

import App from "./App";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter
      future={{
        v7_relativeSplatPath: true,
        v7_startTransition: true,
      }}
    >
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

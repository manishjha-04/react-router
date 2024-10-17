import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import HomeApp from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* No basename for this router. This app renders at the root / URL. */}
    <BrowserRouter
      future={{
        v7_relativeSplatPath: true
      }}>
      <HomeApp />
    </BrowserRouter>
  </React.StrictMode>
);

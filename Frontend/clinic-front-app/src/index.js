import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import store from "./DataDashBoard/store";

// import { store, persistor } from "./DataDashBoard/store";

import App from "./App";
import reportWebVitals from "./reportWebVitals";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <Provider store={store}>
    {/* <PersistGate loading={null} persistor={persistor}> */}
      <React.StrictMode>
        <App />
      </React.StrictMode>
    {/* </PersistGate> */}
  </Provider>,
);

reportWebVitals();

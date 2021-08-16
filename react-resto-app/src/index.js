import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import ErrorBoundry from "./components/error-boundry/error-boundry";
import RestoService from "./services/resto-service";
import RestoServiceContext, {
  ReactReduxContext,
} from "./components/resto-service-context";
import store from "./store";
import { useLocation } from "react-router";
import "./index.scss";

const restoService = new RestoService();

ReactDOM.render(
  <Provider store={store}>
    <ErrorBoundry>
      <RestoServiceContext.Provider value={restoService}>
        <App />
      </RestoServiceContext.Provider>
    </ErrorBoundry>
  </Provider>,
  document.getElementById("root")
);

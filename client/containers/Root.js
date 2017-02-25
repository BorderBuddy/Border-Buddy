import React from "react";
import { Provider } from "react-redux";
import { Router } from "react-router";
import getRoutes from "../routes";

const Root = ({ store, history }) => (
  <Provider store={store}>
    <Router history={history}>
      {getRoutes(store)}
    </Router>
  </Provider>
);

export default Root;

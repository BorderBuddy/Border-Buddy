/*global process, require, module*/
import { createStore, applyMiddleware } from "redux";
import { browserHistory } from "react-router";
import { syncHistoryWithStore } from "react-router-redux";
import thunkMiddleware from "redux-thunk";
import reducer from "../reducers";
import createLogger from 'redux-logger';

let middlewares = [thunkMiddleware];

if (process.env.NODE_ENV == "development") {
  const logger = createLogger();
  middlewares.push(logger);
}

const finalCreateStore = applyMiddleware(...middlewares)(createStore);

const configureStore = (initialState) => {
  const store = finalCreateStore(reducer, initialState);
  const history = syncHistoryWithStore(browserHistory, store);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept("../reducers", () => {
      const nextRootReducer = require("../reducers");
      store.replaceReducer(nextRootReducer);
    });
  }

  return {
    store,
    history
  };
}

export default configureStore;

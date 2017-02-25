import createLogger from 'redux-logger';
import { applyMiddleware, createStore as reduxCreateStore } from 'redux';
import reducer from './modules';
import promiseMiddleware from './middleware/promiseMiddleware';

export default function createStore(initialState) {
  const createStoreWithMiddleware = applyMiddleware(
    createLogger({ logger: console }),
    promiseMiddleware
  )(reduxCreateStore);

  return createStoreWithMiddleware(reducer, initialState);
}

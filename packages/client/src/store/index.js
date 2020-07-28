import { createStore, applyMiddleware } from 'redux'
import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'connected-react-router'
import thunkMiddleware from 'redux-thunk'
import reducer from '../reducers'
import { createLogger } from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension'

export const history = createBrowserHistory()

const reactRouteMiddleware = routerMiddleware(history)
const middleware = [
  thunkMiddleware,
  reactRouteMiddleware,
]

if (process.env.NODE_ENV === 'development') {
  const logger = createLogger()
  middleware.push(logger)
}

export default function configureStore (initialState) {
  const store = createStore(
    reducer(history),
    initialState,
    composeWithDevTools(
      applyMiddleware(
        ...middleware,
      ),
    ),
  )
  // console.log('configureStore called')

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      store.replaceReducer(reducer(history))
    })
  }
  return store
}

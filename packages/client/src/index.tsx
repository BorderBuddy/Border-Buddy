import 'isomorphic-fetch'
import React from 'react'
import ReactDOM from 'react-dom'
import { Root } from './containers/Root'
import configureStore, { history } from './store'
export const store = configureStore()

require('./style/index.scss')

const App = () => (
  <Root store={store} history={history} />
)
ReactDOM.render(<App />, document.getElementById('root'))
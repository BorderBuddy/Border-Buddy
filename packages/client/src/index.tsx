import 'isomorphic-fetch'
import React from 'react'
import ReactDOM from 'react-dom'
import Root from './containers/Root'
import configureStore from './store'
const { store, history } = configureStore()
export { store }

require('./style/index.scss')

ReactDOM.render(
  <Root store={store} history={history} />,
  document.getElementById('root')
)

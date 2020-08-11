import React from 'react'
import ReactDOM from 'react-dom'
import configureStore from './store'
import { Provider } from 'react-redux'
import { MuiThemeProvider } from '@material-ui/core/styles'
import customTheme from './utils/muiTheme'
import {App} from './App'
import {UserProvider} from './UserContext'

export const store = configureStore()
export const Root = () => {
  return (
    <MuiThemeProvider theme={customTheme}>
      <Provider store={store}>
        <UserProvider>
          <App />
        </UserProvider>
      </Provider>
    </MuiThemeProvider>
  )
}

ReactDOM.render(<Root />, document.getElementById('root'))

import React from 'react'
import ReactDOM from 'react-dom'
import { MuiThemeProvider } from '@material-ui/core/styles'
import customTheme from './utils/muiTheme'
import { App } from './App'
import { UserProvider } from './UserContext'

require('./style/index.scss')
export const Root = () => {
  return (
    <MuiThemeProvider theme={customTheme}>
      <UserProvider>
        <App />
      </UserProvider>
    </MuiThemeProvider>
  )
}

ReactDOM.render(<Root />, document.getElementById('root'))

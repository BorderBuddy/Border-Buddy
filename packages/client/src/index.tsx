import React from 'react'
import ReactDOM from 'react-dom'
import { MuiThemeProvider, CssBaseline } from '@material-ui/core'
import customTheme from './utils/muiTheme'
import { App } from './App'
import { UserProvider } from './UserContext'

require('./style/index.scss')
export const Root = () => {
  return (
    <MuiThemeProvider theme={customTheme}>
      <CssBaseline/>
      <UserProvider>
        <App />
      </UserProvider>
    </MuiThemeProvider>
  )
}

ReactDOM.render(<Root />, document.getElementById('root'))

import React from 'react'
import { Provider } from 'react-redux'
import {Router as BrowserRouter } from 'react-router-dom'
import { getRoutes } from '../routes'
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import muiTheme from '../utils/muiTheme'

// eslint-disable-next-line react/prop-types
export const Root = ({ store }) => (
  <Provider store={store}>
    <MuiThemeProvider theme={muiTheme}>
      <Router>
        {getRoutes()}
      </Router>
    </MuiThemeProvider>
  </Provider>
)

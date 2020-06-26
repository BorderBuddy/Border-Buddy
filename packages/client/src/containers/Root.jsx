import React from 'react'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import GetRoutes from '../routes'
import { MuiThemeProvider } from '@material-ui/core/styles'
import customTheme from '../utils/muiTheme'


// eslint-disable-next-line react/prop-types
export const Root = ({store, history}) => (
  <MuiThemeProvider theme={customTheme}>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <GetRoutes />
      </ConnectedRouter>
    </Provider>
  </MuiThemeProvider>
)

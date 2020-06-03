import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { getRoutes } from '../routes'

// needed for Material-UI and onTouchTap events
// import { MuiThemeProvider } from '@material-ui/styles'
// import injectTapEventPlugin from 'react-tap-event-plugin'

// custom Mui Theme
// import muiTheme from '../utils/muiTheme'
// injectTapEventPlugin()

// eslint-disable-next-line react/prop-types
export const Root = ({ store }) => (
  <Provider store={store}>
    {/* <MuiThemeProvider muiTheme={muiTheme}> */}
    {/* <h1>Welcome to the App!</h1> */}
    <BrowserRouter>
      {getRoutes()}
    </BrowserRouter>
    {/* </MuiThemeProvider> */}
  </Provider>
)

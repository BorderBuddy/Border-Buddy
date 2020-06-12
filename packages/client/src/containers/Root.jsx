import React from 'react'
import { Provider } from 'react-redux'
import {BrowserRouter} from 'react-router-dom'
import { getRoutes } from '../routes'
import { MuiThemeProvider } from '@material-ui/core/styles'
import customTheme from '../utils/muiTheme'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

// eslint-disable-next-line react/prop-types
export const Root = ({ store }) => (
  <MuiThemeProvider theme={customTheme}>
    <Provider store={store}>
      <BrowserRouter>
        {/* <Navbar/> */}
        {getRoutes()}
        {/* <Footer/> */}
      </BrowserRouter>
    </Provider>
  </MuiThemeProvider>
)

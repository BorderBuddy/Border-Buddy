import React from 'react'
import { Provider } from 'react-redux'
import {BrowserRouter} from 'react-router-dom'
import { getRoutes } from '../routes'
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import muiTheme from '../utils/muiTheme'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

// eslint-disable-next-line react/prop-types
export const Root = ({ store }) => (
  <Provider store={store}>
    <MuiThemeProvider theme={muiTheme}>
      <BrowserRouter>
        <Navbar/>
        {getRoutes()}
        <Footer/>
      </BrowserRouter>
    </MuiThemeProvider>
  </Provider>
)

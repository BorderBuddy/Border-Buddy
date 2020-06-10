import React from 'react'
import { Provider } from 'react-redux'
import {Router as BrowserRouter } from 'react-router-dom'
import { getRoutes } from '../routes'
import { Footer } from '../components/Footer'
import { Navbar } from '../components/Navbar'
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import muiTheme from '../utils/muiTheme'

// eslint-disable-next-line react/prop-types
export const Root = ({ store }) => (
  <Provider store={store}>
    <MuiThemeProvider theme={muiTheme}>
      <div id="banner" className="col-12">
        <img style={styles.image} src="images/logos-png/BB_Logo-Type-White.png" />
      </div>
      <Navbar/>
      <Router>
        {getRoutes()}
      </Router>
      <Footer/>
    </MuiThemeProvider>
  </Provider>
)

const styles = {
  image: {
    display: 'block',
    margin: 'auto',
    width: '50%'
  }
}

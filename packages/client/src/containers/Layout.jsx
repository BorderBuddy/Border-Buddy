import React from 'react'
import { Toolbar, IconButton, Button, AppBar, Container, Grid } from '@material-ui/core'
import { Footer } from '../components/Footer'
import { Navbar } from '../components/Navbar'
import { RenderAppBar } from '../components/Admin/AppBar'
import api from '../api/api'
import { useHistory } from 'react-router-dom'
import { LoggedIn, LoggedOut } from '../auth/authService'
import { getRoutes } from '../routes'

export const Layout = () => {
  const history = useHistory()

  const onSignoutClick = async () => {
    try {
      await api.logout()
      history.push('/')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div id="homepage">
      <AppBar className="navbar col-12" position="sticky">
        <LoggedIn>
          <Toolbar style={styles.toolbar}>
            <IconButton
              id="btn-all-travelers"
              onClick={() => history.push('/travelers')}>
              <img src="/images/logos-png/BB_Logo_03-White.png" style={styles.icon}/>
            </IconButton>
            <Button
              style={styles.button}
              id="add-new-traveler"
              varitant='text'
              onClick={() => history.push('/travelers/add')}>
                Add Traveler
            </Button>
            <RenderAppBar onSignoutClick={() => onSignoutClick()} />
          </Toolbar>
        </LoggedIn>
        <LoggedOut>
          <div id="banner" className="col-12">
            <img
              style={styles.image}
              src="images/logos-png/BB_Logo-Type-White.png"
            />
          </div>
          <Toolbar style={styles.toolbar}>
            <Navbar />
          </Toolbar>
        </LoggedOut>
      </AppBar>
      <Grid container style={styles.container} justify='space-around'>
        {getRoutes()}
      </Grid>
      <Footer />
    </div>
  )
}
const styles = {
  button: {
    margin: '2em auto',
    display: 'block',
    width: '50%',
    color: 'white',
  },
  icon: {
    maxHeight: '1.5em',
  },
  container: {
    marginTop: '2em',
    marginBottom: '4em',
  },
  toolbar: {
    backgroundColor: '#2d6ea8',
  },
  image: {
    display: 'block',
    margin: 'auto',
    width: '50%',
    maxHeight: '2em',
  },
}

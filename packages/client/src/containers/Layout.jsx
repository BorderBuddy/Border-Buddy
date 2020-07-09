import React, { Component } from 'react'
import { Footer } from '../components/Footer'
import { Navbar } from '../components/Navbar'
import { RenderAppBar } from '../components/Admin/AppBar'
import api from '../api/api'
import { LoggedIn, LoggedOut } from '../auth/authService'
import { getRoutes } from '../routes'
import { Toolbar, IconButton, Button, AppBar, Container } from '@material-ui/core'

class Homepage extends Component {
  constructor (props) {
    super(props)
    this.onSignoutClick = this.onSignoutClick.bind(this)
  }

  async onSignoutClick () {
    console.log(this.props)
    try {
      await api.logout()
      this.props.history.push('/')
    } catch (err) {
      console.error(err)
    }
  }

  render () {
    return (
      <div id="homepage">
        <AppBar className="navbar col-12" position="sticky">
          <LoggedIn>
            <Toolbar style={styles.toolbar}>
              <IconButton
                id="btn-all-travelers"
                onClick={() => this.props.history.push('/travelers')}>
                <img src="/images/logos-png/BB_Logo_03-White.png" style={styles.icon}/>
              </IconButton>
              <Button
                style={styles.button}
                id="add-new-traveler"
                varitant='text'
                onClick={() => this.props.history.push('/travelers/add')}>
                  Add Traveler
              </Button>
              <RenderAppBar onSignoutClick={this.onSignoutClick} />
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
        <Container style={styles.container}>
          {getRoutes()}
        </Container>
        <Footer />
      </div>
    )
  }
}
const styles = {
  button: {
    margin: '2em auto',
    display: 'block',
    width: '50%',
    color: 'white'
  },
  icon: {
    maxHeight: '1.5em'
  },
  container: {
    marginTop: '2em',
    marginBottom: '4em'
  },
  toolbar: {
    backgroundColor: '#2d6ea8'
  },
  image: {
    display: 'block',
    margin: 'auto',
    width: '50%',
    maxHeight: '2em'
  }
}

export default Homepage

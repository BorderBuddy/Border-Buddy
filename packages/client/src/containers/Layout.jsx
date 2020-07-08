import React, { Component } from 'react'
import { Footer } from '../components/Footer'
import { Navbar } from '../components/Navbar'
import { RenderAppBar } from '../components/Admin/AppBar'
import api from '../api/api'
import { LoggedIn, LoggedOut } from '../auth/authService'
import { getRoutes } from '../routes'

class Homepage extends Component {
  constructor(props) {
    super(props)
    this.onSignoutClick = this.onSignoutClick.bind(this)
  }

  async onSignoutClick() {
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
        <div id="banner" className="col-12">
          <img
            style={styles.image}
            src="images/logos-png/BB_Logo-Type-White.png"
          />
        </div>
        <LoggedIn>
          {/* Logged In */}
          <RenderAppBar onSignoutClick={this.onSignoutClick} />
        </LoggedIn>
        <LoggedOut>
          <Navbar />
        </LoggedOut>
        {getRoutes()}
        <Footer />
      </div>
    )
  }
}

const styles = {
  image: {
    display: "block",
    margin: "auto",
    width: "50%",
  },
}

export default Homepage

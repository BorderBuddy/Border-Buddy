import React, { Component } from 'react'
import { connect } from 'react-redux'
import RenderAppBar from '../components/Admin/AppBar'
import { signout } from '../actions/auth'
import api from '../api/api'

class AppBarMenu extends Component {
  constructor(props) {
    super(props)
    this.onSignoutClick = this.onSignoutClick.bind(this);
  }

  async onSignoutClick() {
    try {
      await api.logout()
      this.props.signout()
      this.props.history.push('/')
    } catch (err) {
      console.error(err)
    }
  }

  render() {
    return (
      <RenderAppBar onSignoutClick={this.onSignoutClick}/>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  signout: () => dispatch(signout())
})

export default connect(null, mapDispatchToProps)(AppBarMenu)

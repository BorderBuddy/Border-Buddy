import React, { Component } from 'react'
import { connect } from 'react-redux'
import Testing from '../components/Admin/AppBar'
import { signout } from '../actions/auth'

class AppBarMenu extends Component {
  constructor(props) {
    super(props)
    this.onSignoutClick = this.onSignoutClick.bind(this);
  }

  onSignoutClick() {
    this.props.signout()
  }

  render() {
    return (
      <Testing/>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  signout: () => dispatch(signout())
})

export default connect(null, mapDispatchToProps)(AppBarMenu)

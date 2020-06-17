import React, { Component } from 'react'
import { connect } from 'react-redux'
import RenderAppBar from '../components/Admin/AppBar'
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
      <RenderAppBar onSignoutClick={this.onSignoutClick}/>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  signout: () => dispatch(signout())
})

export default connect(null, mapDispatchToProps)(AppBarMenu)

import React, { Component } from 'react';
import { connect } from 'react-redux';
import AppBarMenu from '../components/Admin/AppBarMenu';
import { signout } from '../actions/auth';

class AppBarMenuContainer extends Component {
  constructor(props) {
    super(props)
    this.onSignoutClick = this.onSignoutClick.bind(this);
  }

  onSignoutClick() {
    this.props.signout();
  }

  render() {
    return (
      <AppBarMenu 
        onSignoutClick={this.onSignoutClick}
      />
    )
  }
}

const mapDispatchToProps = dispatch => ({
  signout: () => dispatch(signout())
})

export default connect(null, mapDispatchToProps)(AppBarMenuContainer);

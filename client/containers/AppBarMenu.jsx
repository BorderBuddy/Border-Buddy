import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import AppBarMenu from '../components/admin/AppBarMenu';
import { signout } from '../actions/auth';

class AppBarMenuContainer extends Component {
  constructor(props) {
    super(props)
    this.onCreateUserClick = this.onCreateUserClick.bind(this);
    this.onSignoutClick = this.onSignoutClick.bind(this);
  };

  onCreateUserClick() {
    browserHistory.push('/admin/createuser')
  }

  onSignoutClick() {
    this.props.signout();
  }

  render() {
    return (
      <AppBarMenu 
        onCreateUserClick={this.onCreateUserClick}
        onSignoutClick={this.onSignoutClick}
      />
    )
  }
}

const mapDispatchToProps = dispatch => ({
  signout: () => dispatch(signout())
})

export default connect(null, mapDispatchToProps)(AppBarMenuContainer);
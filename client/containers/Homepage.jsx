import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import SignUp from '../components/SignUp';
import { signup } from '../actions/signUp';

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ signup }, dispatch);
}

class Homepage extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    signup();
  }

  render() {
    return (
      <div>
        <SignUp handleSubmit={this.handleSubmit}/>
      </div>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(Homepage);

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import SignUp from '../components/SignUp';
import { signUp } from '../actions/signUp';

const mapStateToProps = ({form}) => ({form});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ signUp }, dispatch);
};


class Homepage extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { signUp } = this.props;
    console.log('form data is ', this.props.form.signUp.values)
    signUp(this.props.form.signUp.values);
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
  mapStateToProps,
  mapDispatchToProps
)(Homepage);

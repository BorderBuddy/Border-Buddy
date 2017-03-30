import React, {Component} from "react";
import SignUp from "../components/SignUp";
import SignUpConfirmation from "../components/SignUpConfirmation";

class SignUpContainer extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    this.setState({open: false});
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.createTraveler(this.props.form.signUp.values);
    this.setState({open: true});
  }

  render() {
    return (
      <div id="signup-container">
        <SignUp handleSubmit={this.handleSubmit} handleFlightChange={this.handleFlightChange} />
        <SignUpConfirmation open={this.state.open} flight={this.props.flight} handleClose={this.handleClose}/>
      </div>
    );
  }
}

export default SignUpContainer;

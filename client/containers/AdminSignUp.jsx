import React, { Component } from 'react';
import { connect } from 'react-redux';
import AdminSignUp from "../components/Admin/AdminSignUp";
import { signup } from '../actions/auth';

class SignupContainer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			email: '',
			password: ''
		}
		this.handleEmailChange = this.handleEmailChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleEmailChange(e) {
		this.setState({ email: e.target.value })
	}

	handlePasswordChange(e) {
		this.setState({ password: e.target.value })
	}

	handleSubmit(e) {
		e.preventDefault();
		this.props.signup({
			email: this.state.email,
			password: this.state.password
		})
	}

	render() {
		return(
			<AdminSignUp 
				handleEmailChange={this.handleEmailChange}
				handlePasswordChange={this.handlePasswordChange}
				handleSubmit={this.handleSubmit} />
		)
	}
}

const mapDispatchToProps = dispatch => ({
	signup: (user) => dispatch(signup(user))
})

export default connect(null, mapDispatchToProps)(SignupContainer);
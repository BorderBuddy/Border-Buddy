import React, { Component } from 'react';
import { connect } from 'react-redux';
import Login from "../components/Admin/Login";
import { login } from '../actions/auth';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import ActionFlightTakeoff from 'material-ui/svg-icons/action/flight-takeoff';


class LoginContainer extends Component {
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
		this.props.login({
			email: this.state.email,
			password: this.state.password
		})
	}

	render() {
		return(
			<div>
				<Login
					handleEmailChange={this.handleEmailChange}
					handlePasswordChange={this.handlePasswordChange}
					handleSubmit={this.handleSubmit} />
				</div>
		)
	}
}

const mapDispatchToProps = dispatch => ({
	login: (user) => dispatch(login(user))
})

export default connect(null, mapDispatchToProps)(LoginContainer);
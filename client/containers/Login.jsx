import React, { Component } from 'react';
import Login from "../components/Admin/Login";

class LoginContainer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			email: '',
			password: ''
		}
	}

	render() {
		return(
			<Login />
		)
	}
}

export default LoginContainer
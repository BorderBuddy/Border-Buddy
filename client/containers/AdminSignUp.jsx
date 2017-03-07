import React, { Component } from 'react';
import { connect } from 'react-redux';
import AdminSignUp from "../components/Admin/AdminSignUp";
import { signup } from '../actions/auth';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

class SignupContainer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			email: '',
			password: '',
			open: false
		}
		this.handleEmailChange = this.handleEmailChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleClose = this.handleClose.bind(this);
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
		.then(() => {
			this.setState({ open: true, createdSuccess: true })
		})
		.catch(() => {
			this.setState({ open: true, createdSuccess: false })
		})
	}

	handleClose() {
		this.setState({ open: false })
	}

	render() {
		let actions = [
			<FlatButton
				label="OK"
				primary={true}
				onTouchTap={this.handleClose}
			/>
		]

		return(
			<div>
				<AdminSignUp 
					handleEmailChange={this.handleEmailChange}
					handlePasswordChange={this.handlePasswordChange}
					handleSubmit={this.handleSubmit} />
				<Dialog
					title="Creating New Admin..."
					actions={actions}
					open={this.state.open}
					modal={true}
				>
					{
						this.state.createdSuccess ?
							<h4>New admin created successfully!</h4>
							:
							<h4>There was a problem trying to create a new admin</h4>
					}
				</Dialog>
			</div>
		)
	}
}

const mapDispatchToProps = dispatch => ({
	signup: (user) => dispatch(signup(user))
})

export default connect(null, mapDispatchToProps)(SignupContainer);
import React, { Component } from 'react';
import { connect } from 'react-redux';
import UpdateUser from "../components/Admin/UpdateUser";
import { updateUser } from '../actions/auth';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

class UpdateUserContainer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			email: '',
			oldPassword: '',
			newPassword: '',
      phone: '',
      id: 0,
			open: false
		}
		this.handleEmailChange = this.handleEmailChange.bind(this);
		this.handleNewPasswordChange = this.handleNewPasswordChange.bind(this);
    this.handleOldPasswordChange = this.handleOldPasswordChange.bind(this);
		this.handlePhoneChange = this.handlePhoneChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleClose = this.handleClose.bind(this);
	}

  componentWillReceiveProps(nextProps) {
    console.log("NEXT PROOOOOOOOOPS", nextProps)
    console.log('THIS PROOOOOOOPS',this.props)
    console.log("IDDDDDDD", this.props.auth.id)
    this.setState({ 
      id: this.props.auth.id,
      email: this.props.auth.email,
      phone: this.props.auth.phone
    });
  }


	handleEmailChange(e) {
		this.setState({ email: e.target.value })
	}

	handleOldPasswordChange(e) {
		this.setState({ oldPassword: e.target.value })
	}
	
  handleNewPasswordChange(e) {
		this.setState({ newPassword: e.target.value })
	}

	handlePhoneChange(e) {
		this.setState({ phone: e.target.value })
	}

	handleSubmit(e) {
		e.preventDefault();
		this.props.updateUser({
			email: this.state.email,
			password: this.state.password,
			phone: this.state.phone,
      id: this.state.id
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

    console.log(this.state);
		let actions = [
			<FlatButton
				label="OK"
				primary={true}
				onTouchTap={this.handleClose}
			/>
		]

		return(
			<div>
				<UpdateUser 
					handleEmailChange={this.handleEmailChange}
					handlePasswordChange={this.handlePasswordChange}
					handlePhoneChange={this.handlePhoneChange}
					handleSubmit={this.handleSubmit} />
				<Dialog
					title="Updating Admin..."
					actions={actions}
					open={this.state.open}
					modal={true}
				>
					{
						this.state.createdSuccess ?
							<h4>Admin Updated successfully!</h4>
							:
							<h4>There was a problem trying to update admin</h4>
					}
				</Dialog>
			</div>
		)
	}
}

const mapStateToProps = ({ auth }) => ({
  auth
})

const mapDispatchToProps = dispatch => ({
	updateUser: (user) => dispatch(updateUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(UpdateUserContainer);

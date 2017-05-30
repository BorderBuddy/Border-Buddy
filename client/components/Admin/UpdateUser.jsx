import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import RaisedButton from 'material-ui/RaisedButton';
import { TextField } from 'redux-form-material-ui';
import { Card } from 'material-ui/Card';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import _ from 'lodash';
import { signupLoginStyle } from './styles';
import { minimumLength, required, phone } from '../../utils/validations';
import { whoAmI } from '../../actions/auth';

class UpdateUser extends Component {

  componentDidMount() {
			this.props.whoAmI()
			.then(() => {
				this.props.initialize(this.props.initialValues);
		})
  }

	render() {

		const style = signupLoginStyle;
		const { handleSubmit, pristine, submitting,
		handleEmailChange, handlePasswordChange, handlePhoneChange, valid } = this.props;

		return (
			<Card style={style.card}>
				<div>
					<h3 style={style.title}>Update Profile</h3>
					<form onSubmit={handleSubmit}>
						<Field 
							name="email" 
							component={TextField}
							hintText="Email"
							validate={required}
							onChange={handleEmailChange}
							style={style.form}
						/>
						<Field 
							name="oldPassword" 
							type="password"
							component={TextField}
							hintText="Old Password"
							validate={[required, minimumLength]}
							onChange={handlePasswordChange}
							style={style.form}
						/>
						<Field 
							name="newPassword" 
							type="password"
							component={TextField}
							hintText="New Password (at least 8 characters)"
							validate={[required, minimumLength]}
							onChange={handlePasswordChange}
							style={style.form}
						/>
						<Field 
							name="phone" 
							component={TextField}
							hintText="Phone Number"
							validate={[phone]}
							onChange={handlePhoneChange}
							style={style.form}
						/>
						<RaisedButton
							type="submit"
							label="Save"
							disabled={pristine || submitting || !valid}
							primary={true} 
							style={style.button}
						/>
					</form>
				</div>
			</Card>
		)
	}
}


UpdateUser = reduxForm({
	form: "updateUser"
})(UpdateUser);

const mapStateToProps = ({ auth }) => {
	return {
		initialValues: Object.assign({}, auth, { oldPassword: '', newPassword: '' }),
	}
}

const mapDispatchToProps = dispatch => ({
	whoAmI: (id) => dispatch(whoAmI(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(UpdateUser);
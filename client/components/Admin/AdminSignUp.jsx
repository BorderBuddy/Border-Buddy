import React from 'react';
import { reduxForm, Field } from 'redux-form';
import RaisedButton from 'material-ui/RaisedButton';
import {TextField} from 'redux-form-material-ui';
import { Link } from 'react-router';

const required = value => value == null ? 'Required' : undefined;

const AdminSignUp = ({ handleSubmit, pristine, reset, submitting, handleEmailChange, handlePasswordChange }) => {

	const style = {
		"margin": "5em auto",
		"width": "50%"
	}

	return (
		<div style={style}>
			<legend>Admin SignUp</legend>
			<form onSubmit={handleSubmit}>
				<Field 
					name="email" 
					component={TextField}
					hintText="Email"
					validate={required}
					onChange={handleEmailChange}
				/>
				<Field 
					name="password" 
					component={TextField}
					hintText="Password" 
					validate={required}
					onChange={handlePasswordChange}
				/>
				<RaisedButton
					type="submit"
					label="Sign Up"
					disabled={pristine || submitting}
					primary={true} 
				/>
			</form>
		</div>
	)

}


export default reduxForm({
	form: "adminSignup"
})(AdminSignUp);
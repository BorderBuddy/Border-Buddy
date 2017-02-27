import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { RaisedButton } from 'material-ui';
import { TextField, DatePicker } from 'redux-form-material-ui';

const required = value => value === null ? 'Required' : undefined;
const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
  'Invalid email address' : undefined;


const SignUp = ({ handleSubmit, pristine, reset, submitting }) => {
  const style = {
    form: {
      display: 'block',
      width: '75%',
      margin: '4rem auto'
    },
    input: {
      width: '46%',
      margin: '1%'
    },
    button: {
      margin: '1%'
    }
  };

  return (
    <form style={style.form} onSubmit={handleSubmit}>
      <legend>Sign Up for Border Budddy</legend>
      <div>
        <Field
          name="firstName"
          component={TextField}
          hintText="First Name"
          validate={required}
          style={style.input}
        />
        <Field
          name="lastName"
          component={TextField}
          validate={required}
          hintText="Last Name"
          style={style.input}
        />
      </div>
      <div>
        <Field
          name="flightNumber"
          component={TextField}
          validate={required}
          hintText="Flight Number"
          style={style.input}
        />
        <Field
          name="phoneNumber"
          component={TextField}
          hintText="Phone Number"
          validate={required}
          style={style.input}
        />
      </div>
      <div>
        <Field
          name="nationality"
          component={TextField}
          validate={required}
          hintText="Nationality"
          style={style.input}
        />
        <Field
          name="arrivalDate"
          component={DatePicker}
          validate={required}
          format={null}
          hintText="What day do you arrive?"
          style={style.input}
        />
      </div>
      <div>
        <RaisedButton
          type="submit"
          label="Submit"
          disabled={pristine || submitting}
          primary={true}
          style={style.button}
        />
      </div>
    </form>
  );
}

export default reduxForm({
  form: 'signUp'  // a unique identifier for this form
})(SignUp);

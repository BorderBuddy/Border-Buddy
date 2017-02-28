import React from 'react';
import axios from 'axios';
import { reduxForm, Field } from 'redux-form';
import { RaisedButton, MenuItem } from 'material-ui';
import { TextField, DatePicker, SelectField } from 'redux-form-material-ui';

const required = value => value === null ? 'Required' : undefined;
const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
  'Invalid email address' : undefined;

const validateCode = code => {
  return axios.get(`/api/flight/code?code=${code}`)
  .then(airline => {
    if (!airline) throw new Error
  })
}


const SignUp = ({ handleSubmit, pristine, submitting }) => {
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
          name="name"
          component={TextField}
          validate={required}
          floatingLabelText="Name"
          style={style.input}
        />
        <Field
          name="nationality"
          component={TextField}
          validate={required}
          floatingLabelText="Nationality"
          style={style.input}
        />
      </div>
      <div>
        <Field
          name="email"
          component={TextField}
          validate={[required, email]}
          floatingLabelText="Email"
          style={style.input}
        />
        <Field
          name="phone"
          component={TextField}
          floatingLabelText="Phone Number"
          validate={required}
          style={style.input}
        />
      </div>
      <div>
        <Field
          name="connectivity"
          component={SelectField}
          floatingLabelText="Do you have a smartphone?"
          validate={required}
          style={style.input}
        >
          <MenuItem value="true" primaryText="Yes" />
          <MenuItem value="false" primaryText="No" />
        </Field>
        <Field
          name="secondaryContact"
          component={TextField}
          floatingLabelText="Name/contact of friend or family"
          style={style.input}
        />
      </div>
      <div>
        <Field
          name="arrivalTime"
          component={DatePicker}
          validate={required}
          format={null}
          floatingLabelText="What day do you arrive?"
          style={style.input}
        />
        <Field
          name="airlineCode"
          component={TextField}
          validate={required}
          format={null}
          floatingLabelText="Airline code"
          style={style.input}
        />
        <Field
          name="flightNum"
          component={TextField}
          validate={required}
          format={null}
          floatingLabelText="Flight number"
          style={style.input}
        />
      </div>
      <div>
        <RaisedButton
          type="submit"
          label="Register"
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

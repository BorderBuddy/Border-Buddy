import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { RaisedButton, MenuItem } from 'material-ui';
import { TextField, DatePicker, SelectField } from 'redux-form-material-ui';


import { required, phone, email, validateCode, uppercase } from '../utils/validations'


const airlinePicker = ({ input, label, style, type, meta: { asyncValidating, touched, error }}) => (
    <div className={asyncValidating ? 'async-validating' : ''}>
      <TextField {...input} type={type} floatingLabelText={label} style={style} errorText={touched && error && `${error}`} />
    </div>
);

const SignUp = ({handleSubmit, valid}) => {
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
      <legend>Sign Up for Border Buddy</legend>
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
          validate={[required, phone]}
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
          floatingLabelText="Name/contact of friend or family in US"
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
          component={airlinePicker}
          validate={[uppercase, required]}
          format={null}
          label="Airline code"
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
          disabled={!valid}
          primary={true}
          style={style.button}
        />
      </div>
    </form>
  );
}

export default reduxForm({
  form: 'signUp',  // a unique identifier for this form
  asyncValidate: validateCode,
  asyncBlurFields: ['airlineCode']
})(SignUp);

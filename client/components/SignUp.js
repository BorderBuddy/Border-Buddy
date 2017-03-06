import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { RaisedButton, MenuItem } from 'material-ui';
import { TextField, DatePicker, SelectField } from 'redux-form-material-ui';
import AirlinePicker from './AirlinePicker';


import { required, phone, email, validateCode, uppercase } from '../utils/validations'




const SignUp = ({handleSubmit, valid}) => {
  const style = {
    form: {
      display: 'block',
      width: '80%',
      margin: '0 auto'
    },
    input: {
      width: '80%',
      margin: '1%',
      color: 'black',
    },
    error: {
      color: '#bd1c11'
    },
    label: {
      color: '#526B5C'
    },
    underline: {
      color: '#526B5C'
    },
    button: {
      margin: '0 auto',
      display: 'block',
      marginBottom: '2em',
      width: '80%'
    }
  };

  return (
    <form style={style.form} onSubmit={handleSubmit}>
      <legend className="mx-auto h1 subtitle">Register Your Trip</legend>
      <div className="clearfix">
        <div className="field-container col-12 md-col md-col-6">
          <Field
            name="name"
            component={TextField}
            validate={required}
            floatingLabelText="Name"
            floatingLabelStyle={style.label}
            underlineFocusStyle={style.underline}
            errorStyle={style.error}
            style={style.input}
          />
        </div>
        <div className="field-container col-12 md-col md-col-6">
          <Field
            name="nationality"
            component={TextField}
            validate={required}
            floatingLabelText="Nationality"
            floatingLabelStyle={style.label}
            underlineFocusStyle={style.underline}
            errorStyle={style.error}
            style={style.input}
          />
        </div>
        <div className="field-container col-12 md-col md-col-6">
          <Field
            name="email"
            component={TextField}
            validate={[required, email]}
            floatingLabelText="Email"
            floatingLabelStyle={style.label}
            underlineFocusStyle={style.underline}
            errorStyle={style.error}
            style={style.input}
          />
        </div>
        <div className="field-container col-12 md-col md-col-6">
          <Field
            name="phone"
            component={TextField}
            floatingLabelText="Phone Number"
            floatingLabelStyle={style.label}
            underlineFocusStyle={style.underline}
            errorStyle={style.error}
            validate={[required, phone]}
            style={style.input}
          />
        </div>
        <div className="field-container col-12 md-col md-col-6">
          <Field
            name="connectivity"
            component={SelectField}
            floatingLabelText="Do you have a smartphone?"
            floatingLabelStyle={style.label}
            underlineFocusStyle={style.underline}
            errorStyle={style.error}
            validate={required}
            style={style.input}
          >
            <MenuItem value="true" primaryText="Yes" />
            <MenuItem value="false" primaryText="No" />
          </Field>
        </div>
        <div className="field-container col-12 md-col md-col-6">
          <Field
            name="arrivalTime"
            component={DatePicker}
            validate={required}
            format={null}
            floatingLabelText="What day do you arrive?"
            floatingLabelStyle={style.label}
            underlineFocusStyle={style.underline}
            errorStyle={style.error}
            style={style.input}
          />
        </div>
        <div className="field-container col-12 md-col md-col-6">
          <Field
            name="airlineCode"
            component={AirlinePicker}
            validate={[uppercase, required]}
            format={null}
            label="Airline code"
            floatingLabelStyle={style.label}
            underlineFocusStyle={style.underline}
            errorStyle={style.error}
            style={style.input}
          />
        </div>
        <div className="field-container col-12 md-col md-col-6">
          <Field
            name="flightNum"
            component={TextField}
            validate={required}
            format={null}
            floatingLabelText="Flight number"
            floatingLabelStyle={style.label}
            underlineFocusStyle={style.underline}
            errorStyle={style.error}
            style={style.input}
          />
        </div>
        <div className="col-12">
          <Field
            name="secondaryContact"
            component={TextField}
            floatingLabelText="Emergency contact"
            floatingLabelStyle={style.label}
            underlineFocusStyle={style.underline}
            errorStyle={style.error}
            style={style.input}
          />
        </div>
        <div className="col-12">
          <RaisedButton
            type="submit"
            label="Register"
            disabled={!valid}
            primary={true}
            style={style.button}
          />
        </div>
      </div>
    </form>
  );
}

export default reduxForm({
  form: 'signUp',  // a unique identifier for this form
  asyncValidate: validateCode,
  asyncBlurFields: ['airlineCode']
})(SignUp);

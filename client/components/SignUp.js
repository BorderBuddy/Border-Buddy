import React from 'react';
import {reduxForm, Field} from 'redux-form';
import {RaisedButton, MenuItem} from 'material-ui';
import {TextField, DatePicker, SelectField} from 'redux-form-material-ui';
import AirlinePicker from './AirlinePicker';
import CountryCodePicker from './CountryCodePicker';
import {required, phone, email, validateCode, uppercase} from '../utils/validations';


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
            className="traveler-name"
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
            className="traveler-nationality"
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
            name="requireInterpreter"
            className="traveler-require-interpreter"
            component={SelectField}
            floatingLabelText="Are you comfortable speaking English?"
            floatingLabelStyle={style.label}
            underlineFocusStyle={style.underline}
            errorStyle={style.error}
            validate={required}
            style={style.input}
          >
            <MenuItem className="traveler-not-require-interpreter-option" value="false" primaryText="Yes"/>
            <MenuItem className="traveler-require-interpreter-option" value="true" primaryText="No"/>
          </Field>
        </div>
        <div className="field-container col-12 md-col md-col-6">
          <Field
            name="preferredLanguage"
            className="traveler-preferredLanguage"
            component={TextField}
            floatingLabelText="Preferred language(s)"
            floatingLabelStyle={style.label}
            underlineFocusStyle={style.underline}
            errorStyle={style.error}
            style={style.input}
          />
        </div>
        <div className="field-container col-12 md-col md-col-6">
          <Field
            name="email"
            className="traveler-email"
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
            name="countryCode"
            label="Country code"
            className="traveler-country-phone-code"
            component={CountryCodePicker}
            floatingLabelText="Country Phone Code"
            floatingLabelStyle={style.label}
            underlineFocusStyle={style.underline}
            errorStyle={style.error}
            validate={[required]}
            style={style.input}
          />
        </div>
        <div className="field-container col-12 md-col md-col-6">
          <Field
            name="phone"
            className="traveler-phone-number"
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
            className="traveler-connectivity"
            component={SelectField}
            floatingLabelText="Do you have a smartphone?"
            floatingLabelStyle={style.label}
            underlineFocusStyle={style.underline}
            errorStyle={style.error}
            validate={required}
            style={style.input}
          >
            <MenuItem className="traveler-has-phone-option" value="true" primaryText="Yes"/>
            <MenuItem className="traveler-has-no-phone-option" value="false" primaryText="No"/>
          </Field>
        </div>
      </div>
      <div className="clearfix">
        <h2>Travel details</h2>
        <div className="field-container col-12 md-col sm-col-6 md-col-4">
          <Field
            name="arrivalTime"
            className="traveler-arrival-time"
            component={DatePicker}
            validate={required}
            format={null}
            floatingLabelText="What day do you arrive?"
            floatingLabelStyle={style.label}
            underlineFocusStyle={style.underline}
            errorStyle={style.error}
            textFieldStyle={style.input}
          />
        </div>
        <div className="field-container col-12 md-col sm-col-6 md-col-4">
          <Field
            name="airlineCode"
            className="traveler-airline-code"
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
        <div className="field-container col-12 md-col sm-col-6 md-col-4">
          <Field
            name="flightNum"
            className="traveler-flight-number"
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
      </div>
      <div className="clearfix">
        <h2>Emergency contact</h2>
        <p><em>Who can we contact if we can't get in touch with you?</em></p>
        <div className="field-container col-12 md-col sm-col-6 md-col-4">
          <Field
            name="secondaryContactName"
            className="traveler-secondary-contact-name"
            component={TextField}
            floatingLabelText="Name"
            floatingLabelStyle={style.label}
            underlineFocusStyle={style.underline}
            errorStyle={style.error}
            style={style.input}
          />
        </div>
        <div className="field-container col-12 md-col sm-col-6 md-col-4">
          <Field
            name="secondaryContactPhone"
            className="traveler-secondary-contact-phone"
            component={TextField}
            floatingLabelText="Phone number"
            floatingLabelStyle={style.label}
            underlineFocusStyle={style.underline}
            errorStyle={style.error}
            validate={[phone]}
            style={style.input}
          />
        </div>
        <div className="field-container col-12 md-col sm-col-6 md-col-4">
          <Field
            name="secondaryContactRelation"
            className="traveler-secondary-contact-relation"
            component={TextField}
            floatingLabelText="Relationship to you"
            floatingLabelStyle={style.label}
            underlineFocusStyle={style.underline}
            errorStyle={style.error}
            style={style.input}
          />
        </div>
      </div>
      <div className="clearfix">
        <div className="field-container col-12">
          <RaisedButton
            type="submit"
            label="Register"
            className="submit-traveler-registration"
            disabled={!valid}
            primary={true}
            style={style.button}
          />
        </div>
      </div>
    </form>
  );
};

export default reduxForm({
  form: 'signUp',  // a unique identifier for this form
  asyncValidate: validateCode,
  asyncBlurFields: ['airlineCode']
})(SignUp);

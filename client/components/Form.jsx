import React from 'react';
import StyledField from './Field';
import {RaisedButton, MenuItem, Divider} from 'material-ui';
import {TextField, DatePicker, SelectField, AutoComplete} from 'redux-form-material-ui';
import AirlinePicker from './AirlinePicker';
import {required, phone, email, validateCode, uppercase} from '../utils/validations';
import countryCodes from '../utils/countryCodes';
import { formStyle } from './Admin/styles';

const Form = (props) => (

  <form style={formStyle.form} onSubmit={props.handleSubmit}>
    <h1 style={formStyle.header}>{props.formTitle}</h1>
    <Divider />
    <h3>Personal and Contact Details</h3>
    <p><em>Tell us about yourself, so our lawyers can can best assist you.</em></p>
    <div className="clearfix">
      <div className="field-container col-12 md-col md-col-6">
        <StyledField
          name="name"
          component={TextField}
          validate={required}
          hintText="Name"
        />
      </div>
      <div className="field-container col-12 md-col md-col-6">
        <StyledField 
          name="nationality"
          component={TextField}
          validate={!props.isAdmin ? required : undefined}
          hintText="Nationality"
        />
      </div>
      <div className="field-container col-12 md-col md-col-6">
        <StyledField
          name="requireInterpreter"
          component={SelectField}
          hintText="Are you comfortable speaking English?"
        >
          <MenuItem value="false" primaryText="Yes"/>
          <MenuItem value="true" primaryText="No"/>
        </StyledField>
      </div>
      <div className="field-container col-12 md-col md-col-6">
        <StyledField
          name="preferredLanguage"
          component={TextField}
          hintText="Preferred language(s)"
        />
      </div>
      <div className="field-container col-12 md-col md-col-6">
        <StyledField
          name="email"
          component={TextField}
          validate={!props.isAdmin ? [required, email] : email}
          hintText="Email"
        />
      </div>
      <div className="field-container col-12 md-col md-col-6">
        <StyledField
          name="countryCode"
          component={AutoComplete}
          hintText="Country Phone Code"
          validate={required}
          dataSource={Object.values(countryCodes)}
          filter={AutoComplete.caseInsensitiveFilter}
          fullWidth={true}
        />
      </div>
      <div className="field-container col-12 md-col md-col-6">
        <StyledField
          name="phone"
          component={TextField}
          hintText="Phone Number"
          validate={[required, phone]}
        />
      </div>
      <div className="field-container col-12 md-col md-col-6">
        <StyledField
          name="connectivity"
          component={SelectField}
          hintText="Do you have a smartphone?"
          validate={!props.isAdmin ? required : undefined}
        >
          <MenuItem className="traveler-has-phone-option" value="true" primaryText="Yes"/>
          <MenuItem className="traveler-has-no-phone-option" value="false" primaryText="No"/>
        </StyledField>
      </div>
    </div>
    <div className="clearfix">
      <h3>Travel details</h3>
      <p><em>Tell us when your flight arrives, so we know when to check in with you.</em></p>
      <div className="field-container col-12 md-col sm-col-6 md-col-4">
        <StyledField
          name="arrivalTime"
          component={DatePicker}
          validate={!props.isAdmin ? required : undefined}
          hintText="What day do you arrive?"
          format={null} // eliminates error in Redux Form Material UI
        />
      </div>
      <div className="field-container col-12 md-col sm-col-6 md-col-4">
        <StyledField
          name="airlineCode"
          component={AirlinePicker}
          validate={!props.isAdmin ? [uppercase, required] : uppercase}
          label="Airline code"
        />
      </div>
      <div className="field-container col-12 md-col sm-col-6 md-col-4">
        <StyledField
          name="flightNum"
          component={TextField}
          validate={!props.isAdmin ? required : undefined}
          hintText="Flight number"
        />
      </div>
    </div>
    <div className="clearfix">
      <h3>Emergency contact</h3>
      <p><em>Who can we contact if we can't get in touch with you?</em></p>
      <div className="field-container col-12 md-col sm-col-6 md-col-4">
        <StyledField
          name="secondaryContactName"
          component={TextField}
          hintText="Name"
        />
      </div>
      <div className="field-container col-12 md-col sm-col-6 md-col-4">
        <StyledField
          name="secondaryContactPhone"
          component={TextField}
          hintText="Phone Number"
          validate={[phone]}
        />
      </div>
      <div className="field-container col-12 md-col sm-col-6 md-col-4">
        <StyledField
          name="secondaryContactRelation"
          component={TextField}
          hintText="Relationship to you"
        />
      </div>
    </div>
    {props.children /* renders the AdminExtension part of the form or any other additional fields you may want */ }
    <div>
      <RaisedButton
        type="submit"
        label="Register"
        className="submit-traveler-registration"
        disabled={!props.valid}
        primary={true}
        style={formStyle.submitButton}
      />
      {
        props.showAdditionalButtons &&
        <div>
          <RaisedButton 
            label="Text Traveler" 
            onClick={props.sendText} 
            style={formStyle.adminButton} 
            labelColor="#2d6ea8" 
          />
          <RaisedButton 
            label="Delete Traveler" 
            onClick={props.deleteTraveler} 
            style={formStyle.adminButton} 
            backgroundColor="#bd1c11" 
            labelColor="#FFFFFF" 
          />
        </div>
      }
    </div>
  </form>
);

export default Form;
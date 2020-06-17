import React from 'react'
import {RenderTextField, RenderSelectField, RenderAirlinePicker, RenderDatePicker} from './Field'
import {Field} from 'redux-form'
import {Button, Divider} from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'
import {required, phone, email, validateCode, uppercase} from '../utils/validations'
import { formStyle } from './Admin/styles'
import { CountryCodePicker } from './CountryCodePicker'

const Form = (props) => (
  <form style={formStyle.form} onSubmit={props.handleSubmit}>
    <h1 style={formStyle.header}>{props.formTitle}</h1>
    <Divider />
    <h3>Personal and Contact Details</h3>
    <p><em>Tell us about yourself, so our lawyers can can best assist you.</em></p>
    <div className="clearfix">
      <div className="field-container col-12 md-col md-col-6">
        <Field
          name="name"
          component={RenderTextField}
          underlineFocusStyle={formStyle.underline}
          style={formStyle.input}
          validate={required}
          label="Name"
        />
      </div>
      <div className="field-container col-12 md-col md-col-6">
        <Field 
          name="nationality"
          component={RenderTextField}
          underlineFocusStyle={formStyle.underline}
          style={formStyle.input}
          validate={!props.isAdmin ? required : undefined}
          label="Nationality"
        />
      </div>
      <div className="field-container col-12 md-col md-col-6">
        <Field
          name="requireInterpreter"
          underlineFocusStyle={formStyle.underline}
          style={formStyle.input}
          component={RenderSelectField}
          label="Are you comfortable speaking English?"
        >
          <option value="false">Yes</option> 
          <option value="true">No</option> 
        </Field>
      </div>
      <div className="field-container col-12 md-col md-col-6">
        <Field
          name="preferredLanguage"
          component={RenderTextField}
          underlineFocusStyle={formStyle.underline}
          style={formStyle.input}
          label="Preferred language(s)"
        />
      </div>
      <div className="field-container col-12 md-col md-col-6">
        <Field
          name="email"
          component={RenderTextField}
          underlineFocusStyle={formStyle.underline}
          style={formStyle.input}
          validate={!props.isAdmin ? [required, email] : email}
          label="Email"
        />
      </div>
      <div className="field-container col-12 md-col md-col-6">
        <Field
          name="countryCode"
          component={CountryCodePicker}
          style={formStyle.input}
          underlineFocusStyle={formStyle.underline}
          labelText="Country Phone Code"
          filter={Autocomplete.caseInsensitiveFilter}
          validate={required}
        />
      </div>
      <div className="field-container col-12 md-col md-col-6">
        <Field
          name="phone"
          component={RenderTextField}
          underlineFocusStyle={formStyle.underline}
          style={formStyle.input}
          label="Phone Number"
          validate={[required, phone]}
        />
      </div>
      <div className="field-container col-12 md-col md-col-6">
        <Field
          name="connectivity"
          style={formStyle.input}
          component={RenderSelectField}
          underlineFocusStyle={formStyle.underline}
          label="Do you have a smartphone?"
          validate={!props.isAdmin ? required : undefined}
        >
          <option className="traveler-has-phone-option" value="true" primaryText="Yes">Yes</option>
          <option className="traveler-has-no-phone-option" value="false" primaryText="No">No</option>
        </Field>
      </div>
    </div>
    <div className="clearfix">
      <h3>Travel details</h3>
      <p><em>Tell us when your flight arrives, so we know when to check in with you.</em></p>
      <div className="field-container col-12 md-col sm-col-6 md-col-4">
        <Field
          name="arrivalTime"
          style={formStyle.input}
          component={RenderDatePicker}
          underlineFocusStyle={formStyle.underline}
          validate={!props.isAdmin ? required : undefined}
          label="What day do you arrive?"
        />
      </div>
      <div className="field-container col-12 md-col sm-col-6 md-col-4">
        <Field
          name="airlineCode"
          style={formStyle.input}
          underlineFocusStyle={formStyle.underline}
          component={RenderAirlinePicker}
          validate={!props.isAdmin ? [uppercase, required] : uppercase}
          label="Airline code"
        />
      </div>
      <div className="field-container col-12 md-col sm-col-6 md-col-4">
        <Field
          name="flightNum"
          component={RenderTextField}
          underlineFocusStyle={formStyle.underline}
          style={formStyle.input}
          validate={!props.isAdmin ? required : undefined}
          label="Flight number"
        />
      </div>
    </div>
    <div className="clearfix">
      <h3>Emergency contact</h3>
      <p><em>Who can we contact if we can't get in touch with you?</em></p>
      <div className="field-container col-12 md-col sm-col-6 md-col-4">
        <Field
          name="secondaryContactName"
          component={RenderTextField}
          underlineFocusStyle={formStyle.underline}
          style={formStyle.input}
          label="Name"
        />
      </div>
      <div className="field-container col-12 md-col sm-col-6 md-col-4">
        <Field
          name="secondaryContactPhone"
          component={RenderTextField}
          underlineFocusStyle={formStyle.underline}
          style={formStyle.input}
          label="Phone Number"
          validate={[phone]}
        />
      </div>
      <div className="field-container col-12 md-col sm-col-6 md-col-4">
        <Field
          name="secondaryContactRelation"
          component={RenderTextField}
          underlineFocusStyle={formStyle.underline}
          style={formStyle.input}
          label="Relationship to you"
        />
      </div>
    </div>
    {/* {props.children /* renders the AdminExtension part of the form or any other additional fields you may want */ }
    <div> 
      <Button
        type="submit"
        label="Register"
        variant='contained'
        className="submit-traveler-registration"
        disabled={!props.valid}
        color='primary'
        style={formStyle.submitButton}
      > Register</Button>
      {
        props.showAdditionalButtons &&
        <div>
          <Button 
            label="Text Traveler" 
            variant='contained'
            onClick={props.sendText} 
            style={formStyle.adminButton} 
            labelColor="#2d6ea8" 
          >Text Traveler</Button>
          <Button 
            label="Delete Traveler" 
            variant='contained'
            onClick={props.deleteTraveler} 
            style={formStyle.adminButton} 
            backgroundColor="#bd1c11" 
            labelColor="#FFFFFF" 
          >Delete Traveler</Button>
        </div>
      }
    </div>
  </form>
)

export default Form
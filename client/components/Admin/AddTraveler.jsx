import React from 'react';
import { TextField, DatePicker, SelectField } from 'redux-form-material-ui';
import { MenuItem, RaisedButton } from 'material-ui';
import { Field, reduxForm } from 'redux-form';
import { required, phone, email, uppercase, validateCode } from '../../utils/validations';
import AirlinePicker from '../AirlinePicker';


export class AddTraveler extends React.Component {
  constructor() {
    super();
  }

  render() {
    const { handleSubmit, valid } = this.props;
    const style = {
      form: {
        display: 'block',
        width: '80%',
        margin: '1em auto'
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
        display: 'block',
        margin: '1em auto'
      }
    };

    const menuItems = (representatives) => {
      return (
        representatives && representatives.map((rep, index) => {
          return <MenuItem key={index} value={rep.id} primaryText={first3Chars(rep.email)} className="traveler-assign-to-option" />;
        })
      );
    };

    const first3Chars = (text) => {
      return text.substring(0, 3).toUpperCase();
    };

    return (
      <form data-test="single-traveler-form" style={style.form} onSubmit={handleSubmit}>
        <div>
          <div className="clearfix">
            <div className="field-container col-12 md-col md-col-6">
              <legend className="h1 subtitle">Add Traveler</legend>
            </div>
            <div className="field-container col-12 md-col md-col-6">
              <Field
                name="representative"
                component={SelectField}
                floatingLabelText="Assign To"
                style={style.input}
                errorStyle={style.error}
                floatingLabelStyle={style.label}
                underlineFocusStyle={style.underline}
                className="traveler-assign-to"
              >
                {menuItems(this.props.representatives)}
              </Field>
            </div>
          </div>
          <div className="clearfix">
            <div className="field-container col-12 md-col md-col-6">
              <Field
                name="name"
                floatingLabelText="Name"
                component={TextField}
                validate={required}
                style={style.input}
                errorStyle={style.error}
                floatingLabelStyle={style.label}
                underlineFocusStyle={style.underline}
              />
            </div>
            <div className="field-container col-12 md-col md-col-6">
              <Field
                name="nationality"
                floatingLabelText="Nationality"
                component={TextField}
                style={style.input}
                errorStyle={style.error}
                floatingLabelStyle={style.label}
                underlineFocusStyle={style.underline}
              />
            </div>

            <div className="field-container col-12 md-col md-col-6">
              <Field
                name="requireInterpreter"
                component={SelectField}
                floatingLabelText="Traveler requires interpreter?"
                style={style.input}
                errorStyle={style.error}
                floatingLabelStyle={style.label}
                underlineFocusStyle={style.underline}
              >
                <MenuItem value="true" primaryText="Yes" />
                <MenuItem value="false" primaryText="No" />
              </Field>
            </div>
            <div className="field-container col-12 md-col md-col-6">
              <Field
                name="preferredLanguage"
                floatingLabelText="PreferredLanguage"
                component={TextField}
                style={style.input}
                errorStyle={style.error}
                floatingLabelStyle={style.label}
                underlineFocusStyle={style.underline}
              />
            </div>

            <div className="field-container col-12 md-col md-col-6">
              <Field
                name="email"
                floatingLabelText="Email"
                component={TextField}
                validate={[email]}
                style={style.input}
                errorStyle={style.error}
                floatingLabelStyle={style.label}
                underlineFocusStyle={style.underline}
              />
            </div>
            <div className="field-container col-12 md-col md-col-6">
              <Field
                name="countryCode"
                floatingLabelText="Country Code"
                component={TextField}
                validate={[required]}
                style={style.input}
                errorStyle={style.error}
                floatingLabelStyle={style.label}
                underlineFocusStyle={style.underline}
              />
            </div>
            <div className="field-container col-12 md-col md-col-6">
              <Field
                name="phone"
                floatingLabelText="Phone"
                component={TextField}
                validate={[phone]}
                style={style.input}
                errorStyle={style.error}
                floatingLabelStyle={style.label}
                underlineFocusStyle={style.underline}
              />
            </div>
            <div className="field-container col-12 md-col md-col-6">
              <Field
                name="connectivity"
                component={SelectField}
                floatingLabelText="Smartphone?"
                style={style.input}
                errorStyle={style.error}
                floatingLabelStyle={style.label}
                underlineFocusStyle={style.underline}
              >
                <MenuItem value="true" primaryText="Yes" />
                <MenuItem value="false" primaryText="No" />
              </Field>
            </div>
          </div>
          <div className="clearfix">
            <h2>Travel details</h2>
            <div className="field-container col-12 md-col md-col-4">
              <Field
                name="arrivalTime"
                component={DatePicker}
                format={null}
                floatingLabelText="What day do you arrive?"
                style={style.input}
                errorStyle={style.error}
                floatingLabelStyle={style.label}
                underlineFocusStyle={style.underline}
              />
            </div>
            <div className="field-container col-12 md-col md-col-4">
              <Field
                name="airlineCode"
                component={AirlinePicker}
                validate={[uppercase]}
                label="Airline Code"
                style={style.input}
                errorStyle={style.error}
                floatingLabelStyle={style.label}
                underlineFocusStyle={style.underline}
              />
            </div>
            <div className="field-container col-12 md-col md-col-4">
              <Field
                name="flightNum"
                component={TextField}
                floatingLabelText="Flight Number"
                style={style.input}
                errorStyle={style.error}
                floatingLabelStyle={style.label}
                underlineFocusStyle={style.underline}
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
            <h2>Traveler Status</h2>
            <div className="field-container col-12 md-col md-col-6">
              <Field
                name="flightStatus"
                component={SelectField}
                floatingLabelText="Flight Status"
                style={style.input}
                errorStyle={style.error}
                floatingLabelStyle={style.label}
                underlineFocusStyle={style.underline}
                disabled={true}
              >
                <MenuItem value={'scheduled'} primaryText="Scheduled"/>
                <MenuItem value={'delayed'} primaryText="Delayed"/>
                <MenuItem value={'arrived'} primaryText="Arrived"/>
              </Field>
            </div>
            <div className="field-container col-12 md-col md-col-6">
              <Field
                name="passengerStatus"
                component={SelectField}
                floatingLabelText="Passenger Status"
                style={style.input}
                errorStyle={style.error}
                floatingLabelStyle={style.label}
                underlineFocusStyle={style.underline}
              >
                <MenuItem value={'transit'} primaryText="In Transit"/>
                <MenuItem value={'unconfirmed'} primaryText="Unconfirmed"/>
                <MenuItem value={'detained'} primaryText="Detained"/>
                <MenuItem value={'at risk'} primaryText="At Risk"/>
                <MenuItem value={'cleared'} primaryText="Cleared"/>
              </Field>
            </div>
          </div>
          <div className="clearfix">
            <div className="field-container col-12 md-col md-col-6">
              <RaisedButton
                type="submit"
                label="Submit"
                disabled={!valid}
                primary={true}
                style={style.button}
                className="add-new-traveler"
                id="submit-new-traveler"
              />
            </div>
          </div>
        </div>
      </form>
    )
  }
}

export default reduxForm({
  form: 'adminAddTraveler',
  asyncValidate: validateCode,
  asyncBlurFields: ['airlineCode']
})(AddTraveler);
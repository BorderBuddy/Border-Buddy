import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import { TextField, DatePicker, SelectField } from 'redux-form-material-ui';
import MenuItem from 'material-ui/MenuItem';
import AirlinePicker from '../AirlinePicker';
import { fetchSelectedTraveler } from '../../actions/selectedTraveler';


import { required, phone, email, validateCode, uppercase } from '../../utils/validations';

class SingleTraveler extends Component {
	constructor() {
		super();
	}

	componentDidMount() {
		this.props.fetchSelectedTraveler(this.props.id)
		.then(() => {
			this.props.initialize(this.props.initialValues);
		})
	}

	render() {
		const { handleSubmit, changed, valid, sendText } = this.props;
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
		return (
			<form data-test="single-traveler-form" style={style.form} onSubmit={handleSubmit}>
				<div>
					<legend className="mx-auto h1 subtitle">Update Traveler</legend>
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
								label="Save Changes"
								disabled={!valid}
								primary={true}
								style={style.button}
							/>
						</div>
						<div className="field-container col-12 md-col md-col-6">
							<RaisedButton
								label="Text Traveler"
								secondary={true}
								style={style.button}
								onClick={sendText}
							/>
						</div>
					</div>
				</div>
			</form>
		)
	}
}

SingleTraveler = reduxForm({
	form: 'singleTraveler',
	asyncValidate: validateCode,
	asyncBlurFields: ['airlineCode']
})(SingleTraveler)

const mapStateToProps = ({ selectedTraveler }) => {
  const { name, nationality, requireInterpreter, preferredLanguage, email, phone, connectivity, secondaryContactPhone, secondaryContactName,
		secondaryContactRelation, status: passengerStatus } = selectedTraveler;
  const { airlineCode, flightNum, arrivalTime, status: flightStatus } = selectedTraveler.flight || {};
	const flightDate = arrivalTime ? new Date(arrivalTime) : null;
  return { 
    initialValues: {
      name, nationality, requireInterpreter: String(requireInterpreter), preferredLanguage, email, phone, connectivity: String(connectivity), secondaryContactPhone, secondaryContactName, secondaryContactRelation,
			passengerStatus, arrivalTime: flightDate, airlineCode, flightNum, flightStatus
    }
  }  
};

const mapDispatchToProps = dispatch => {
	return {
		fetchSelectedTraveler: (id) => dispatch(fetchSelectedTraveler(id))
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleTraveler)

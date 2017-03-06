import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import Card from 'material-ui/Card';
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
			<form style={style.form} onSubmit={handleSubmit}>
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
								validate={required}
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
							validate={[required, email]}
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
								validate={[required, phone]}
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
								validate={required}
								style={style.input}
								errorStyle={style.error}
								floatingLabelStyle={style.label}
								underlineFocusStyle={style.underline}
							>
								<MenuItem value={true} primaryText="Yes" />
								<MenuItem value={false} primaryText="No" />
							</Field>
						</div>
						<div className="field-container col-12 md-col md-col-6">
							<Field
								name="passengerStatus"
								component={SelectField}
								floatingLabelText="Passenger Status"
								validate={required}
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
						<div className="field-container col-12 md-col md-col-6">
							<Field
								name="secondaryContact"
								component={TextField}
								floatingLabelText="secondary contact"
								style={style.input}
								errorStyle={style.error}
								floatingLabelStyle={style.label}
								underlineFocusStyle={style.underline}
							/>
						</div>
						<div className="field-container col-12 md-col md-col-6">
							<Field
								name="arrivalTime"
								component={DatePicker}
								validate={required}
								format={null}
								floatingLabelText="Date of Arrival"
								style={style.input}
								errorStyle={style.error}
								floatingLabelStyle={style.label}
								underlineFocusStyle={style.underline}
							/>
						</div>
						<div className="field-container col-12 md-col md-col-6">
							<Field
								name="airlineCode"
								component={AirlinePicker}
								validate={[uppercase, required]}
								label="Airline Code"
								style={style.input}
								errorStyle={style.error}
								floatingLabelStyle={style.label}
								underlineFocusStyle={style.underline}
							/>
						</div>
						<div className="field-container col-12 md-col md-col-6">
							<Field
								name="flightNum"
								component={TextField}
								floatingLabelText="Flight Number"
								validate={required}
								style={style.input}
								errorStyle={style.error}
								floatingLabelStyle={style.label}
								underlineFocusStyle={style.underline}
							/>
						</div>
						<div className="col-12">
							<Field
								name="flightStatus"
								component={SelectField}
								floatingLabelText="Flight Status"
								validate={required}
								style={style.input}
								errorStyle={style.error}
								floatingLabelStyle={style.label}
								underlineFocusStyle={style.underline}
							>
								<MenuItem value={'scheduled'} primaryText="Scheduled"/>
								<MenuItem value={'delayed'} primaryText="Delayed"/>
								<MenuItem value={'arrived'} primaryText="Arrived"/>
							</Field>
						</div>
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
  const { name, nationality, email, phone, connectivity, secondaryContact, status: passengerStatus } = selectedTraveler;
  const { airlineCode, flightNum, arrivalTime, status: flightStatus } = selectedTraveler.flight;
	const flightDate = arrivalTime ? new Date(arrivalTime) : null;
  return { 
    initialValues: {
      name, nationality, email, phone, connectivity, secondaryContact, passengerStatus, arrivalTime: flightDate, airlineCode, flightNum, flightStatus
    }
  }  
}

const mapDispatchToProps = dispatch => {
	return {
		fetchSelectedTraveler: (id) => dispatch(fetchSelectedTraveler(id))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleTraveler)
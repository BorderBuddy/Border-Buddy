import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import Card from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import { TextField, DatePicker, SelectField } from 'redux-form-material-ui';
import MenuItem from 'material-ui/MenuItem';


import { required, phone, email, validateCode, uppercase } from '../../utils/validations'

class SingleTraveler extends Component {
	constructor() {
		super();
	}

	componentDidMount() {
		this.props.initialize();
	}

	render() {
		return (
			<div>
				<Card>
					<form>
						<Field
							name="name"
							floatingLabelText="name"
							component={TextField}
						/>
						<Field
							name="nationality"
							floatingLabelText="nationality"
							component={TextField}
							/>
						<Field
							name="email"
							floatingLabelText="email"
							component={TextField}
							/>
						<Field
							name="phone"
							floatingLabelText="phone"
							component={TextField}
							/>
						<Field
							name="connectivity"
							component={SelectField}
							floatingLabelText="smartphone?"
							validate={required}
						>
							<MenuItem value="true" primaryText="Yes" />
							<MenuItem value="false" primaryText="No" />
						</Field>
						<Field
							name="secondaryContact"
							component={TextField}
							floatingLabelText="secondary contact"
						/>
						<Field
							name="arrivalTime"
							component={DatePicker}
							validate={required}
							format={null}
							floatingLabelText="date of arrival"
						/>
						<Field
							name="airlineCode"
							component={TextField}
							floatingLabelText="airline code"
							/>
						<Field
							name="flightNum"
							component={TextField}
							floatingLabelText="flight number"
						/>
						<Field
							name="status"
							component={SelectField}
							floatingLabelText="status"
						>
							<MenuItem value={'transit'} primaryText="In Transit"/>
							<MenuItem value={'unconfirmed'} primaryText="Unconfirmed"/>
							<MenuItem value={'detained'} primaryText="Detained"/>
							<MenuItem value={'at risk'} primaryText="At Risk"/>
							<MenuItem value={'cleared'} primaryText="Cleared"/>
						</Field>
						<RaisedButton disabled={!this.props.changed} type="submit" label="Save Changes" />
					</form>
				</Card>
			</div>
		)
	}
}

SingleTraveler = reduxForm({
	form: 'singleTraveler',
	asyncValidate: validateCode,
	asyncBlurFields: ['airlineCode']
})(SingleTraveler)

const mapStateToProps = ({ selectedTraveler }) => {
  const { name, nationality, email, phone, connectivity, secondaryContact, status } = selectedTraveler;
  const { airlineCode, flightNum, arrivalTime } = selectedTraveler.flight;
  return { 
    initialValues: {
      name, nationality, email, phone, connectivity, secondaryContact, status, arrivalTime, airlineCode, flightNum
    }
  }  
}

export default connect(mapStateToProps)(SingleTraveler)
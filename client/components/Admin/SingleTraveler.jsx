import React from 'react';
import TextField from 'material-ui/TextField';
import Card from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

export default ({ traveler, flight, updateTraveler, updateFlight, handleSubmit, changed }) => (

	<div>
		<Card>
			<form onSubmit={handleSubmit}>
				<TextField
					floatingLabelText="name"
					value={traveler.name}
					floatingLabelFixed={true}
					onChange={(evt) => updateTraveler('name', evt.target.value)} />
				<TextField
					floatingLabelText="phone"
					value={traveler.phone}
					floatingLabelFixed={true}
					onChange={(evt) => updateTraveler('phone', evt.target.value)} />
				<TextField
					floatingLabelText="nationality"
					value={traveler.nationality}
					floatingLabelFixed={true}
					onChange={(evt) => updateTraveler('nationality', evt.target.value)} />
				<TextField
					floatingLabelText="flight number"
					value={flight.flightNum}
					floatingLabelFixed={true}
					onChange={(evt) => updateFlight('flightNum', evt.target.value)} />
				<TextField
					floatingLabelText="flight date"
					value={flight.arrivalDate}
					floatingLabelFixed={true}
					onChange={(evt) => updateFlight('arrivalDate', evt.target.value)} />
				<SelectField
					floatingLabelText="status"
					value={traveler.status}
					floatingLabelFixed={true}
					onChange={(evt, index, value) => updateTraveler('status', value)}
				>
					<MenuItem value={'transit'} primaryText="In Transit"/>
					<MenuItem value={'unconfirmed'} primaryText="Unconfirmed"/>
					<MenuItem value={'detained'} primaryText="Detained"/>
					<MenuItem value={'at risk'} primaryText="At Risk"/>
					<MenuItem value={'cleared'} primaryText="Cleared"/>
				</SelectField>
				<RaisedButton disabled={!changed} type="submit" label="Save Changes" />
			</form>
		</Card>
	</div>

);

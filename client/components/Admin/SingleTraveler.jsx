import React from 'react';
import TextField from 'material-ui/TextField';
import Card from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';

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
					value={flight.number}
					floatingLabelFixed={true}
					onChange={(evt) => updateFlight('number', evt.target.value)} />
				<TextField
					floatingLabelText="flight date"
					value={flight.date}
					floatingLabelFixed={true}
					onChange={(evt) => updateFlight('date', evt.target.value)} />
				<TextField
					floatingLabelText="flight time"
					value={flight.time}
					floatingLabelFixed={true}
					onChange={(evt) => updateFlight('time', evt.target.value)} />
				<TextField
					floatingLabelText="status"
					value={traveler.status}
					floatingLabelFixed={true}
					onChange={(evt) => updateTraveler('status', evt.target.value)} />
				<RaisedButton disabled={!changed} type="submit" label="Save Changes" />
			</form>
		</Card>
	</div>

);

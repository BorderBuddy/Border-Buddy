import React from 'react';

export default ({ signUpTraveler }) => (
	<div>
		<h2>Success!</h2>
		<h4>{`Hello, ${signUpTraveler.name}!`}</h4>
		<h4>We have created a secure record of your travel information.</h4>
		<h4>{`Two hours after you land, we will send a text to ${signUpTraveler.phone}`}</h4>
		<h4>If you do not respond 'ok', we will send a lawyer to the airport.</h4>
		<h4>Safe travels, and thanks for using BorderBuddy!</h4>
	</div>
);


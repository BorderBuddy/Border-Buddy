import React from 'react';

export default ({ signUpTraveler }) => (
	<div id="success-container">
		<h2 className="center">Success!</h2>
		<h4 className="center">{`Hello, ${signUpTraveler.name}!`}</h4>
		<h4 className="center">We have created a secure record of your travel information.</h4>
		<h4 className="center">{`Two hours after you land, we will send a text to ${signUpTraveler.phone}`}</h4>
		<h4 className="center">If you do not respond 'ok', we will send a lawyer to the airport.</h4>
		<h4 className="center">Follow the link below for FAQ about your rights when entering the US.</h4>
		<a className="center link-external" href="http://www.cunyclear.org/kyr/">Know Your Rights</a>
		<h4 className="center">Safe travels, and thanks for using BorderBuddy!</h4>
	</div>
);


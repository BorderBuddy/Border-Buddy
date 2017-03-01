import React from 'react';

export default ({ flight }) => {
	const departureDate = new Date(flight.scheduledFlights[0].departureTime);
	const arrivalDate = new Date(flight.scheduledFlights[0].arrivalTime);

	let depMins = departureDate.getMinutes().toString();
	let arrMins = arrivalDate.getMinutes().toString();

	if (depMins.length !== 2) depMins = `0${depMins}`;
	if (arrMins.length !== 2) arrMins = `0${arrMins}`;

	return (
		<div>
		  <h3>Please confirm your flight info:</h3>
		  <div>
				<h4>Departing</h4>
				<h5>{flight.appendix.airports[0].cityCode} - {flight.appendix.airports[0].name}</h5>
				<h5>{departureDate.getYear() + 1900} / {departureDate.getMonth() + 1} / {departureDate.getDate()}</h5>
				<h5>At: {departureDate.getHours()}:{depMins}</h5>
		  </div>
		  <div>
				<h4>Arriving</h4>
				<h5>{flight.appendix.airports[1].cityCode} - {flight.appendix.airports[1].name}</h5>
				<h5>On: {arrivalDate.getYear() + 1900} / {arrivalDate.getMonth() + 1} / {arrivalDate.getDate()}</h5>
				<h5>At: {arrivalDate.getHours()}:{arrMins}</h5>
		  </div>

		</div>
	)
}
	
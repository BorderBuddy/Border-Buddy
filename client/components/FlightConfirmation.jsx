import React from 'react';

export default ({ flight }) => {
	const departureDate = new Date(flight.scheduledFlights[0].departureTime);
	const arrivalDate = new Date(flight.scheduledFlights[0].arrivalTime);

	let depMins = departureDate.getMinutes().toString();
	let arrMins = arrivalDate.getMinutes().toString();

	if (depMins.length !== 2) depMins = `0${depMins}`;
	if (arrMins.length !== 2) arrMins = `0${arrMins}`;

	return (
		<div id="flight-confirmation-container" className="clearfix">
		  <div className="col-12">
				<h3 className="center m1">Departing</h3>
				<h4 className="m1">From:  {flight.appendix.airports[0].cityCode} - {flight.appendix.airports[0].name}</h4>
				<h4 className="m1">Date:  {departureDate.getYear() + 1900} / {departureDate.getMonth() + 1} / {departureDate.getDate()}</h4>
				<h4 className="m1">Time:  {departureDate.getHours()}:{depMins}</h4>
		  </div>
		  <div className="col-12">
				<h3 className="center m1">Arriving</h3>
				<h4 className="m1">To:  {flight.appendix.airports[1].cityCode} - {flight.appendix.airports[1].name}</h4>
				<h4 className="m1">Date:  {arrivalDate.getYear() + 1900} / {arrivalDate.getMonth() + 1} / {arrivalDate.getDate()}</h4>
				<h4 className="m1">Time:  {arrivalDate.getHours()}:{arrMins}</h4>
		  </div>

		</div>
	);
};

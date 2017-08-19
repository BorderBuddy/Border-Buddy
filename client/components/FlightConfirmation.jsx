import React from 'react';

export default ({ flight }) => {

	if (!flight) {
		return <h4>Sorry, we could not find your flight</h4>
	}

	const departureDate = flight.scheduledFlights[0].departureTime.split('T');
	const arrivalDate = flight.scheduledFlights[0].arrivalTime.split('T');
	const { arrivalAirportFsCode, departureAirportFsCode, carrierFsCode, flightNumber } = flight.scheduledFlights[0];
	const { airlines } = flight.appendix;

	let arrivalCityName, arrivalAirport, departureCityName, departureAirport, airlineName;


	const airport1 = flight.appendix.airports[0];
	const airport2 = flight.appendix.airports[1];

	if (airport1.iata === arrivalAirportFsCode) {
		arrivalCityName = airport1.city;
		arrivalAirport = airport1.name;
		departureCityName = airport2.city;
		departureAirport = airport2.name;
	} else {
		arrivalCityName = airport2.city;
		arrivalAirport = airport2.name;
		departureCityName = airport1.city;
		departureAirport = airport1.name;
	}

	for (let i = 0; i < airlines.length; i++) {
		if (airlines[i].iata === carrierFsCode) {
			airlineName = airlines[i].name;
		}
	}

	return (
		<div id="flight-confirmation-container" className="clearfix">
		  <div className="col-12">
				<h3>{airlineName} {flightNumber} {departureAirportFsCode}-{arrivalAirportFsCode}</h3>
		  </div>
		  <div className="col-12">
				<h3 className="center m1">Departing</h3>
				<h4 className="m1">From:  {departureCityName} - {departureAirport}</h4>
				<h4 className="m1">Date:  {departureDate[0]}</h4>
				<h4 className="m1">Time:  {departureDate[1].slice(0, 5)}</h4>
		  </div>
		  <div className="col-12">
				<h3 className="center m1">Arriving</h3>
				<h4 className="m1">To:  {arrivalCityName} - {arrivalAirport}</h4>
				<h4 className="m1">Date:  {arrivalDate[0]}</h4>
				<h4 className="m1">Time:  {arrivalDate[1].slice(0, 5)}</h4>
		  </div>

		</div>
	);
};

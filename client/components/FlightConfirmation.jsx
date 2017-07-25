import React from 'react';

export default ({ flight }) => {

	const {
		arrivalCityName,
		arrivalAirportName,
		departureCityName,
		departureAirportName,
		arrivalCountryName,
		departureCountryName,
		arrivalAirportFsCode,
		departureAirportFsCode,
		airlineName,
		arrivalTimeLocal,
		departureTimeLocal,
		arrivalTimeUtc,
		departureTimeUtc,
		flightNumber,
		carrierFsCode
	} = flight;



	return (
		<div id="flight-confirmation-container" className="clearfix">
		  <div className="col-12">
				<h3>{airlineName} {flightNumber} {departureAirportName} to {arrivalAirportName}</h3>
		  </div>
		  <div className="col-12">
				<h3 className="center m1">Departing</h3>
				<h4 className="m1">From:  {departureCityName} - {departureAirportFsCode}</h4>
				<h4 className="m1">Date:  {departureTimeLocal}</h4>
				<h4 className="m1">Time:  {departureTimeLocal}</h4>
		  </div>
		  <div className="col-12">
				<h3 className="center m1">Arriving</h3>
				<h4 className="m1">To:  {arrivalCityName} - {arrivalAirportFsCode}</h4>
				<h4 className="m1">Date:  {arrivalTimeLocal}</h4>
				<h4 className="m1">Time:  {arrivalTimeLocal}</h4>
		  </div>

		</div>
	);
};

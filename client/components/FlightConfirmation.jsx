import React from 'react';
import { flightConfirmationConverter } from '../converters/FlightConfirmation';

export default props => {

	const {
		arrivalCityName,
		arrivalAirportName,
		departureCityName,
		departureAirportName,
		arrivalAirportFsCode,
		departureAirportFsCode,
		airlineName,
		departureTimeLocalDate,
		arrivalTimeLocalDate,
		departureTimeLocalTime,
		arrivalTimeLocalTime,
		flightNumber
	} = flightConfirmationConverter(props);

	return (
		<div id="flight-confirmation-container" className="clearfix">
		  <div className="col-12">
				<h3>{airlineName} {flightNumber} {departureAirportName} to {arrivalAirportName}</h3>
		  </div>
		  <div className="col-12">
				<h3 className="center m1">Departing</h3>
				<h4 className="m1">From:  {departureCityName} - {departureAirportFsCode}</h4>
				<h4 className="m1">Date:  {departureTimeLocalDate}</h4>
				<h4 className="m1">Time:  {departureTimeLocalTime}</h4>
		  </div>
		  <div className="col-12">
				<h3 className="center m1">Arriving</h3>
				<h4 className="m1">To:  {arrivalCityName} - {arrivalAirportFsCode}</h4>
				<h4 className="m1">Date:  {arrivalTimeLocalDate}</h4>
				<h4 className="m1">Time:  {arrivalTimeLocalTime}</h4>
		  </div>

		</div>
	);
};

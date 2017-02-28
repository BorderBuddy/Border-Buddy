import React from 'react';

export default ({ flight }) => {

	const arrivalTime = Date.parse(flight.scheduledFlights[0].arrivalTime)

	return(
		<div>
		  <h3>Please confirm your flight info:</h3>
		  {
		  	flight.appendix.airports.map(airport => (
					<div>
						<h4>{airport.cityCode} - {airport.name}</h4>
					</div>
		  	))
		  }

		</div>
	)
}
	
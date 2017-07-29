export const flightConfirmationConverter = ({ flight }) => {

	const {
		arrivalCityName,
		arrivalAirportName,
		departureCityName,
		departureAirportName,
		arrivalAirportFsCode,
		departureAirportFsCode,
		airlineName,
		arrivalTimeLocal,
		departureTimeLocal,
		flightNumber
	} = flight;

	const dateRE = /\d{4}-\d{2}-\d{2}/;
	const timeRE = /\d{2}:\d{2}/;

	const departureTimeLocalDate = departureTimeLocal.match(dateRE)[0];
	const arrivalTimeLocalDate = arrivalTimeLocal.match(dateRE)[0];
	const departureTimeLocalTime = departureTimeLocal.match(timeRE)[0];
	const arrivalTimeLocalTime = arrivalTimeLocal.match(timeRE)[0];

	return {
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
	};
};

export const airlineInfoMapper = airlines => {
	return airlines[0];
};

export const flightInfoMapper = fsFlightData => {

	const {
		arrivalCityName,
		arrivalAirportName,
		departureCityName,
		departureAirportName,
		arrivalUtcOffset,
		departureUtcOffset,
		arrivalCountryName,
		departureCountryName,
		arrivalAirportFsCode,
		departureAirportFsCode
	} = mapAirportInfo(fsFlightData);

	const { airlineName } = mapAirlineName(fsFlightData);

	const {
		arrivalTimeLocal,
		departureTimeLocal,
		arrivalTimeUtc,
		departureTimeUtc
	} = mapTimes(fsFlightData, arrivalUtcOffset, departureUtcOffset);

	return {
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
		departureTimeUtc
	};
};


///////////////////     HELPER  METHODS    ///////////////////

const mapAirportInfo = fsFlightData => {

	const { departureAirportFsCode, arrivalAirportFsCode } = fsFlightData.scheduledFlights[0];
	const airport1 = fsFlightData.appendix.airports[0];
	const airport2 = fsFlightData.appendix.airports[1];

	const inOrder = airport1.fs === departureAirportFsCode;
	let arrivalCityName, arrivalAirportName, departureCityName, departureAirportName,
			arrivalUtcOffset, departureUtcOffset, arrivalCountryName, departureCountryName;

	arrivalCityName = inOrder ? airport1.city : airport2.city;
	arrivalAirportName = inOrder ? airport1.name : airport2.name;
	departureCityName = inOrder ? airport2.city : airport1.city;
	departureAirportName = inOrder ? airport2.name : airport1.name;
	arrivalUtcOffset = inOrder ? airport1.utcOffsetHours : airport2.utcOffsetHours;
	departureUtcOffset = inOrder ? airport2.utcOffsetHours : airport1.utcOffsetHours;
	arrivalCountryName = inOrder ? airport1.countryName : airport2.countryName;
	departureCountryName = inOrder ? airport2.countryName : airport1.countryName;

	return {
		arrivalCityName,
		arrivalAirportName,
		departureCityName,
		departureAirportName,
		arrivalUtcOffset,
		departureUtcOffset,
		arrivalCountryName,
		departureCountryName,
		arrivalAirportFsCode,
		departureAirportFsCode
	};
};


const mapAirlineName = fsFlightData => {

	const { carrierFsCode } = fsFlightData.scheduledFlights[0];
	const { airlines } = fsFlightData.appendix;
	const bestName = airlines.find(airline => airline.fs === carrierFsCode);

	return { airlineName: bestName.name };
};

const mapTimes = (fsFlightData, arrivalUtcOffset, departureUtcOffset) => {

	const arrivalTimeLocal = fsFlightData.scheduledFlights[0].arrivalTime;
	const departureTimeLocal = fsFlightData.scheduledFlights[0].departureTime;
	const arrivalTimeUtc = addUtcOffset(arrivalTimeLocal, arrivalUtcOffset);
	const departureTimeUtc = addUtcOffset(departureTimeLocal, departureUtcOffset);

	return {
		arrivalTimeLocal,
		departureTimeLocal,
		arrivalTimeUtc,
		departureTimeUtc
	};
};


const addUtcOffset = (dateStr, utcOffset) => {
	const date = new Date(dateStr);
	let oldHours = date.getHours();
	date.setHours(oldHours + utcOffset);
	return date.toISOString();
};


export const airlineInfoMapper = (airlines, code) => {
	return airlines.find(airline => airline.iata === code);
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

	const {
		airlineName,
		flightNumber,
		carrierFsCode
	} = mapAirlineDetails(fsFlightData);

	const {
		arrivalTimeLocal,
		departureTimeLocal,
		arrivalTimeUtc,
		departureTimeUtc
	} = mapTimes(fsFlightData, arrivalUtcOffset, departureUtcOffset);

	return {
		departureCityName,
		departureAirportName,
		departureCountryName,
		departureAirportFsCode,
		arrivalCityName,
		arrivalAirportName,
		arrivalCountryName,
		arrivalAirportFsCode,
		departureTimeLocal,
		departureTimeUtc,
		arrivalTimeLocal,
		arrivalTimeUtc,
		airlineName,
		flightNumber,
		carrierFsCode
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

	departureCityName = inOrder ? airport1.city : airport2.city;
	departureAirportName = inOrder ? airport1.name : airport2.name;
	departureUtcOffset = inOrder ? airport1.utcOffsetHours : airport2.utcOffsetHours;
	departureCountryName = inOrder ? airport1.countryName : airport2.countryName;

	arrivalCityName = inOrder ? airport2.city : airport1.city;
	arrivalAirportName = inOrder ? airport2.name : airport1.name;
	arrivalUtcOffset = inOrder ? airport2.utcOffsetHours : airport1.utcOffsetHours;
	arrivalCountryName = inOrder ? airport2.countryName : airport1.countryName;

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


const mapAirlineDetails = fsFlightData => {

	const { carrierFsCode, flightNumber } = fsFlightData.scheduledFlights[0];
	const { airlines } = fsFlightData.appendix;
	const bestName = airlines.find(airline => airline.fs === carrierFsCode);

	return {
		airlineName: bestName.name,
		flightNumber,
		carrierFsCode
	};
};

const mapTimes = (fsFlightData, arrivalUtcOffset, departureUtcOffset) => {

	const arrivalTimeLocal = fsFlightData.scheduledFlights[0].arrivalTime;
	const departureTimeLocal = fsFlightData.scheduledFlights[0].departureTime;
	const arrivalTimeUtc = subtractUtcOffset(arrivalTimeLocal, arrivalUtcOffset);
	const departureTimeUtc = subtractUtcOffset(departureTimeLocal, departureUtcOffset);

	return {
		arrivalTimeLocal,
		departureTimeLocal,
		arrivalTimeUtc,
		departureTimeUtc
	};
};


const subtractUtcOffset = (dateStr, utcOffset) => {
	const date = new Date(dateStr);
	let oldHours = date.getHours();
	date.setHours(oldHours - utcOffset);
	return date.toISOString();
};


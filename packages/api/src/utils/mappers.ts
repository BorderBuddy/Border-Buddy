export interface FSFlightData {
  request: {
    airline: {
      fsCode: string
      requestedCode: string
    }
  }
  appendix: {
    airports: Airport[]
    airlines: Airline[]
  }
  flightStatuses: FlightStatus[]
}

export interface Airline {
  fs: string
  iata: string
  icao: string
  name: string
  phoneNumber: string
  active: boolean
}

export interface FlightStatus {
  departureAirportFsCode: string
  arrivalAirportFsCode: string
  carrierFsCode: string
  flightNumber: string
  departureDate: {
    dateUtc: Date
    dateLocal: Date
  }

  arrivalDate: {
    dateUtc: Date
    dateLocal: Date
  }
}

export interface Airport {
  fs: string
  iata: string
  icao: string
  faa: string
  name: string
  street1: string
  street2: string
  city: string
  cityCode: string
  stateCode: string
  postalCode: string
  countryCode: string
  countryName: string
  regionName: string
  timeZoneRegionName: string
  weatherZone: string
  localTime: Date
  utcOffsetHours: number
  latitude: number
  longitude: number
  elevationFeet: number
  classification: number
  active: boolean
  weatherUrl: string
  delayIndexUrl: string
}

export const airlineInfoMapper = (airlines: Airline[], code: string) => {
  return airlines.find(airline => airline.iata === code)
}

export const flightInfoMapper = (fsFlightData: FSFlightData) => {
  const {
    arrivalCityName,
    arrivalAirportName,
    departureCityName,
    departureAirportName,
    // arrivalUtcOffset,
    // departureUtcOffset,
    arrivalCountryName,
    departureCountryName,
    arrivalAirportFsCode,
    departureAirportFsCode,
  } = mapAirportInfo(fsFlightData)

  const {
    airlineName,
    flightNumber,
    carrierFsCode,
  } = mapAirlineDetails(fsFlightData)

  const {
    arrivalTimeLocal,
    departureTimeLocal,
    arrivalTimeUtc,
    departureTimeUtc,
  } = mapTimes(fsFlightData)

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
    carrierFsCode,
  }
}

// / ////////////////     HELPER  METHODS    ///////////////////

const mapAirportInfo = (fsFlightData: FSFlightData) => {
  const { departureAirportFsCode, arrivalAirportFsCode } = fsFlightData.flightStatuses[0]

  const departureAirport = fsFlightData.appendix.airports.find(
    airport => airport.fs === departureAirportFsCode,
  )

  const arrivalAirport = fsFlightData.appendix.airports.find(
    airport => airport.fs === arrivalAirportFsCode,
  )

  const departureCityName = departureAirport ? departureAirport.city : undefined
  const departureAirportName = departureAirport ? departureAirport.name : undefined
  // const departureUtcOffset = departureAirport ? departureAirport.utcOffsetHours : undefined
  const departureCountryName = departureAirport ? departureAirport.countryName : undefined

  const arrivalCityName = arrivalAirport ? arrivalAirport.city : undefined
  const arrivalAirportName = arrivalAirport ? arrivalAirport.name : undefined
  // const arrivalUtcOffset = arrivalAirport ? arrivalAirport.utcOffsetHours : undefined
  const arrivalCountryName = arrivalAirport ? arrivalAirport.countryName : undefined

  return {
    arrivalCityName,
    arrivalAirportName,
    departureCityName,
    departureAirportName,
    // arrivalUtcOffset,
    // departureUtcOffset,
    arrivalCountryName,
    departureCountryName,
    arrivalAirportFsCode,
    departureAirportFsCode,
  }
}

const mapAirlineDetails = (fsFlightData: FSFlightData) => {
  let bestName
  const { carrierFsCode, flightNumber } = fsFlightData.flightStatuses[0]
  const {airline: {fsCode}} = fsFlightData.request
  const { airlines } = fsFlightData.appendix
  const requestName = airlines.find(airline => airline.fs === fsCode)
  const carrierName = airlines.find(airline => airline.fs === carrierFsCode)

  if (carrierName) {
    bestName = carrierName.name
  } else if (requestName) {
    bestName = requestName.name
  }
  return {
    airlineName: bestName,
    flightNumber,
    carrierFsCode,
  }
}

const mapTimes = (fsFlightData : FSFlightData) => {
  const arrivalTimeLocal = fsFlightData.flightStatuses[0].arrivalDate.dateLocal
  const departureTimeLocal = fsFlightData.flightStatuses[0].departureDate.dateLocal
  const arrivalTimeUtc = fsFlightData.flightStatuses[0].arrivalDate.dateUtc
  const departureTimeUtc = fsFlightData.flightStatuses[0].departureDate.dateUtc

  return {
    arrivalTimeLocal,
    departureTimeLocal,
    arrivalTimeUtc,
    departureTimeUtc,
  }
}

// const subtractUtcOffset = (dateStr, utcOffset) => {
//   const date = new Date(dateStr)
//   const oldHours = date.getHours()
//   date.setHours(oldHours - utcOffset)
//   return date.toISOString()
// }

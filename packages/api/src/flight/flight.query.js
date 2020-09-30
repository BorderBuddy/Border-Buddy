import { config } from '../config'
const { FLIGHT_STATS_ID, FLIGHT_STATS_KEY } = config

const baseline = 'https://api.flightstats.com/flex'
const keys = `?appId=${FLIGHT_STATS_ID}&appKey=${FLIGHT_STATS_KEY}`

export const airlineByCode = code =>
  baseline + `/airlines/rest/v1/json/iata/${code}${keys}`

// TODO: JFK is currently hardcoded until we add the arrival airport to the form
export const statusByCodeAndDate = (code, flightNum, year, month, day) =>
  baseline + `/flightstatus/rest/v2/json/flight/status/${code}/${flightNum}/arr/${year}/${month}/${day}${keys}&utc=false&airport=LAX`

// alternative query using flightStats unique flightId
export const statusByFlightStatsFlightId = (flightId) =>
  baseline + `/flightstatus/rest/v2/json/flight/status/${flightId}${keys}`

// only useful for flights in the past
export const scheduleByCodeAndDate = (code, flightNum, year, month, day) =>
  baseline + `/schedules/rest/v1/json/flight/${code}/${flightNum}/arriving/${year}/${month}/${day}` + keys

// example response from statusByCodeAndDate from flightStats:
// {
//   "request": {
//    "airline": {
//     "fsCode": "DL",
//     "requestedCode": "DL"
//    },
//    "flight": {
//     "requested": "5632",
//     "interpreted": "5632"
//    },
//    "utc": {
//     "requested": "false",
//     "interpreted": false
//    },
//    "url": "https://api.flightstats.com/flex/flightstatus/rest/v2/json/flight/status/DL/5632/arr/2020/09/23?utc=false&airport=JFK",
//    "nonstopOnly": {
//     "interpreted": false
//    },
//    "airport": {
//     "fsCode": "JFK",
//     "requestedCode": "JFK"
//    },
//    "date": {
//     "year": "2020",
//     "month": "09",
//     "day": "23",
//     "interpreted": "2020-09-23"
//    }
//   },
//   "appendix": {
//    "airlines": [
//     {
//      "fs": "KL",
//      "iata": "KL",
//      "icao": "KLM",
//      "name": "KLM",
//      "phoneNumber": "1-800-447-4747",
//      "active": true
//     },
//     {
//      "fs": "DL",
//      "iata": "DL",
//      "icao": "DAL",
//      "name": "Delta Air Lines",
//      "phoneNumber": "1-800-221-1212",
//      "active": true
//     },
//     {
//      "fs": "AZ",
//      "iata": "AZ",
//      "icao": "AZA",
//      "name": "Alitalia",
//      "phoneNumber": "1-800-223-5730",
//      "active": true
//     },
//     {
//      "fs": "KE",
//      "iata": "KE",
//      "icao": "KAL",
//      "name": "Korean Air",
//      "phoneNumber": "1-800-438-5000",
//      "active": true
//     },
//     {
//      "fs": "AM",
//      "iata": "AM",
//      "icao": "AMX",
//      "name": "Aeromexico",
//      "phoneNumber": "1-800-237-6639",
//      "active": true
//     },
//     {
//      "fs": "WS",
//      "iata": "WS",
//      "icao": "WJA",
//      "name": "WestJet",
//      "phoneNumber": "1-888-937-8538",
//      "active": true
//     },
//     {
//      "fs": "VS",
//      "iata": "VS",
//      "icao": "VIR",
//      "name": "Virgin Atlantic",
//      "active": true
//     },
//     {
//      "fs": "YX",
//      "iata": "YX",
//      "icao": "RPA",
//      "name": "Republic Airways",
//      "active": true
//     }
//    ],
//    "airports": [
//     {
//      "fs": "BOS",
//      "iata": "BOS",
//      "icao": "KBOS",
//      "faa": "BOS",
//      "name": "Logan International Airport",
//      "street1": "One Harborside Drive",
//      "street2": "",
//      "city": "Boston",
//      "cityCode": "BOS",
//      "stateCode": "MA",
//      "postalCode": "02128-2909",
//      "countryCode": "US",
//      "countryName": "United States",
//      "regionName": "North America",
//      "timeZoneRegionName": "America/New_York",
//      "weatherZone": "MAZ015",
//      "localTime": "2020-09-23T11:08:05.247",
//      "utcOffsetHours": -4,
//      "latitude": 42.36646,
//      "longitude": -71.020176,
//      "elevationFeet": 19,
//      "classification": 1,
//      "active": true,
//      "weatherUrl": "https://api.flightstats.com/flex/weather/rest/v1/json/all/BOS?codeType=fs",
//      "delayIndexUrl": "https://api.flightstats.com/flex/delayindex/rest/v1/json/airports/BOS?codeType=fs"
//     },
//     {
//      "fs": "JFK",
//      "iata": "JFK",
//      "icao": "KJFK",
//      "faa": "JFK",
//      "name": "John F. Kennedy International Airport",
//      "street1": "JFK Airport",
//      "city": "New York",
//      "cityCode": "NYC",
//      "stateCode": "NY",
//      "postalCode": "11430",
//      "countryCode": "US",
//      "countryName": "United States",
//      "regionName": "North America",
//      "timeZoneRegionName": "America/New_York",
//      "weatherZone": "NYZ178",
//      "localTime": "2020-09-23T11:08:05.247",
//      "utcOffsetHours": -4,
//      "latitude": 40.642335,
//      "longitude": -73.78817,
//      "elevationFeet": 13,
//      "classification": 1,
//      "active": true,
//      "weatherUrl": "https://api.flightstats.com/flex/weather/rest/v1/json/all/JFK?codeType=fs",
//      "delayIndexUrl": "https://api.flightstats.com/flex/delayindex/rest/v1/json/airports/JFK?codeType=fs"
//     }
//    ],
//    "equipments": [
//     {
//      "iata": "E75",
//      "name": "Embraer 175",
//      "turboProp": false,
//      "jet": true,
//      "widebody": false,
//      "regional": true
//     }
//    ]
//   },
//   "flightStatuses": [
//    {
//     "flightId": 1044844424,
//     "carrierFsCode": "YX",
//     "flightNumber": "5632",
//     "departureAirportFsCode": "BOS",
//     "arrivalAirportFsCode": "JFK",
//     "departureDate": {
//      "dateUtc": "2020-09-23T17:00:00.000Z",
//      "dateLocal": "2020-09-23T13:00:00.000"
//     },
//     "arrivalDate": {
//      "dateUtc": "2020-09-23T18:24:00.000Z",
//      "dateLocal": "2020-09-23T14:24:00.000"
//     },
//     "status": "S",
//     "schedule": {
//      "flightType": "J",
//      "serviceClasses": "JY",
//      "restrictions": "",
//      "uplines": [],
//      "downlines": []
//     },
//     "operationalTimes": {
//      "publishedDeparture": {
//       "dateUtc": "2020-09-23T17:00:00.000Z",
//       "dateLocal": "2020-09-23T13:00:00.000"
//      },
//      "scheduledGateDeparture": {
//       "dateUtc": "2020-09-23T17:00:00.000Z",
//       "dateLocal": "2020-09-23T13:00:00.000"
//      },
//      "flightPlanPlannedDeparture": {
//       "dateUtc": "2020-09-23T17:05:00.000Z",
//       "dateLocal": "2020-09-23T13:05:00.000"
//      },
//      "scheduledRunwayDeparture": {
//       "dateUtc": "2020-09-23T17:05:00.000Z",
//       "dateLocal": "2020-09-23T13:05:00.000"
//      },
//      "publishedArrival": {
//       "dateUtc": "2020-09-23T18:24:00.000Z",
//       "dateLocal": "2020-09-23T14:24:00.000"
//      },
//      "flightPlanPlannedArrival": {
//       "dateUtc": "2020-09-23T17:48:00.000Z",
//       "dateLocal": "2020-09-23T13:48:00.000"
//      },
//      "scheduledGateArrival": {
//       "dateUtc": "2020-09-23T18:24:00.000Z",
//       "dateLocal": "2020-09-23T14:24:00.000"
//      },
//      "scheduledRunwayArrival": {
//       "dateUtc": "2020-09-23T17:48:00.000Z",
//       "dateLocal": "2020-09-23T13:48:00.000"
//      }
//     },
//     "codeshares": [
//      {
//       "fsCode": "AM",
//       "flightNumber": "3219",
//       "relationship": "L"
//      },
//      {
//       "fsCode": "AZ",
//       "flightNumber": "3451",
//       "relationship": "L"
//      },
//      {
//       "fsCode": "KE",
//       "flightNumber": "3935",
//       "relationship": "L"
//      },
//      {
//       "fsCode": "KL",
//       "flightNumber": "5423",
//       "relationship": "L"
//      },
//      {
//       "fsCode": "VS",
//       "flightNumber": "2715",
//       "relationship": "L"
//      },
//      {
//       "fsCode": "WS",
//       "flightNumber": "6499",
//       "relationship": "L"
//      },
//      {
//       "fsCode": "DL",
//       "flightNumber": "5632",
//       "relationship": "S"
//      }
//     ],
//     "delays": {},
//     "flightDurations": {
//      "scheduledBlockMinutes": 84,
//      "scheduledAirMinutes": 43,
//      "scheduledTaxiOutMinutes": 5,
//      "scheduledTaxiInMinutes": 36
//     },
//     "airportResources": {
//      "departureTerminal": "A",
//      "departureGate": "A9",
//      "arrivalTerminal": "4",
//      "arrivalGate": "B43",
//      "baggage": "T4"
//     },
//     "flightEquipment": {
//      "scheduledEquipmentIataCode": "E75",
//      "actualEquipmentIataCode": "E75",
//      "tailNumber": "N204JQ"
//     }
//    }
//   ]
//  }

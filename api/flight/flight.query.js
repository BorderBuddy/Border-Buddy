import { FLIGHT_STATS_ID, FLIGHT_STATS_KEY } from './apiKeys';

const baseline = 'https://api.flightstats.com/flex'
const keys = `?appId=${FLIGHT_STATS_ID}&appKey=${FLIGHT_STATS_KEY}`

export const airlineByCode = code => 
	baseline + `/airlines/rest/v1/json/iata/${code}` + keys

export const statusByCodeAndDate = (code, flightNum, year, month, day) => 
	baseline + `/flightstatus/rest/v2/json/flight/status/${code}/${flightNum}/arr/${year}/${month}/${day}` + keys

export const scheduleByCodeAndDate = (code, flightNum, year, month, day) =>
	baseline + `/schedules/rest/v1/json/flight/${code}/${flightNum}/arriving/${year}/${month}/${day}` + keys

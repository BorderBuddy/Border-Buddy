import axios from 'axios'
import { airlineByCode, statusByCodeAndDate } from '../flight.query'
import { flightInfoMapper, airlineInfoMapper } from '../../utils/mappers'
import { verifyRecaptchaToken } from '../../utils/recaptcha'
import { RequestHandler } from 'express'

const getCode : RequestHandler = (req, res, next) => {
  const code = req.query.code as string

  return axios.get(airlineByCode(code))
    .then(results => {
      const { airlines } = results.data
      if (!airlines.length) {
        res.status(404).json('code not found')
      } else {
        const mappedAirlineInfo = airlineInfoMapper(airlines, code)
        res.status(200).json(mappedAirlineInfo)
      }
    })
    .catch(next)
}

const verifyFlight : RequestHandler = async (req, res, next) => {
  console.log('verify flight from prod called')
  // const { code, flightNum, year, month, day } = req.query
  const { code, flightNum, year, month, day, token } = req.body

  if (verifyRecaptchaToken(token)) {
    console.log('FlightStats API called')
    return axios.get(statusByCodeAndDate(code, flightNum, year, month, day))
      .then(flight => {
        // console.log(flight.data)
        if (!flight.data.flightStatuses.length) {
        // if (flight.data.error || !flight.data.scheduledFlights.length) {
          res.status(404).json('flight not found')
        } else {
          const mappedFlightInfo = flightInfoMapper(flight.data)
          res.status(200).json(mappedFlightInfo)
        }
      })
      .catch(next)
  } else {
    res.status(403)
  }
}

export default { getCode, verifyFlight }

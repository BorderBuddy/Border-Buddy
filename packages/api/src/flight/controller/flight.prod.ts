import axios from 'axios'
import { airlineByCode, statusByCodeAndDate } from '../flight.query'
import { flightInfoMapper, airlineInfoMapper } from '../../utils/mappers'
import { RequestHandler } from 'express'
const querystring = require('querystring')

const verifyToken = async (token: string) => {
  if (token === process.env.secret) {
    return true
  } else {
    const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY

    console.log(RECAPTCHA_SECRET_KEY, token)
    const isHuman = await axios.post(`https://www.google.com/recaptcha/api/siteverify`,
      querystring.stringify({
        secret: RECAPTCHA_SECRET_KEY,
        response: token,
      }),
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
        },
      })
      .then(res => {
        console.log(res.data)
        return res.data
      })
      .then(data => data.success)
      .catch(err => {
        throw new Error(`Error in Google Siteverify API. ${err.message}`)
      })

    console.log(isHuman)
    if (token === null || !isHuman) {
      console.log('false gonna be returned')
      return false
    } else {
      console.log('passed the test')
      return true
    }
  }
}

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

  if (verifyToken(token)) {
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

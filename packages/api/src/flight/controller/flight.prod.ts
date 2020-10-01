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
  const { code, flightNum, year, month, day, token } = req.body

  try {
    const verified = await verifyRecaptchaToken(token)
    // console.log(verified)
    if (verified === true) {
      console.log('FlightStats API called')
      return axios.get(statusByCodeAndDate(code, flightNum, year, month, day))
        .then(flight => {
          if (!flight.data.flightStatuses.length) {
            // res.status(200).json('flight not found')
            res.status(200).json({
              success: false,
              message: 'flight not found...',
            })
          } else {
            const mappedFlightInfo = flightInfoMapper(flight.data)
            res.status(200).json(
              {
                success: true,
                data: mappedFlightInfo,
              })
          }
        })
        .catch(next)
    } else {
      res.status(200).json(
        {
          success: false,
          message: 'catpcha not verified',
        })
    }
  } catch (err) {
    res.status(200).json(
      {
        success: false,
        message: err,
      })
  }
}

export default { getCode, verifyFlight }

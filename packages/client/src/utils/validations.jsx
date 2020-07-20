import axios from 'axios'
import * as Yup from 'yup'
import airlines from './airlines.json'

export const required = value => value === null || value === '' ? 'Required' : undefined

export const phone = value =>
  value && !/^\d{10}$/.test(value)
    ? 'Invalid phone, please enter as "5552224444"' : undefined

export const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address' : undefined

export const uppercase = value => value && value !== value.toUpperCase() ? 'Must be uppercase' : undefined

// old way of hitting flightstats api
export const validateCode = values => {
  return axios.get(`/api/flight/code?code=${values.airlineCode}`)
    .then(response => console.log(response.data))
    .catch(() => {
      throw { airlineCode: 'Airline code not found!' }
    })
}
export const asyncValidateAirlineCode = async value => {
  return await axios.get(`/api/flight/code?code=${value}`)
    .then((response) => {
      return response.status === 200
    })
    .catch(() => false)
}
// hardcoded airline codes json taken from
// https://raw.githubusercontent.com/npow/airline-codes/master/airlines.json
// TODO: It can be updated with a script every once in a while if we want...
export const validateAirlineCode = value => {
  const code = airlines.find(el => el.iata === value)
  return code !== undefined
}

export const minimumLength = value => value !== undefined && value.length < 8 ? 'Must be at least 8 characters long' : undefined

export const numbersOnly = value => value && !/^[0-9]+$/i.test(value) ? 'Please only put the country code number only' : undefined

export const phoneRegExp = /^\d{10}$/

export const yupValidationSchema = isAdmin => Yup.object().shape(
  {
    name: Yup.string()
      .required(),
    nationality: !isAdmin
      ? Yup.string()
        .required()
      : null,
    email: !isAdmin
      ? Yup.string()
        .email()
        .required()
      : Yup.string()
        .email(),
    countryCode: Yup
      .object()
      .required(),
    phone: Yup.string()
      .required()
      .matches(phoneRegExp, 'Invalid phone, please enter as 5552224444'),
    connectivity: !isAdmin
      ? Yup.string()
        .required()
      : null,
    flightNum: !isAdmin
      ? Yup.string()
        .required()
      : null,
    secondaryContactPhone: Yup.string()
      .matches(phoneRegExp, 'Invalid phone, please enter as 5552224444'),
    scheduledArrivalTime: !isAdmin
      ? Yup.date().required()
      : null,
    airlineCode: !isAdmin
      ? Yup.string()
        .required()
        .uppercase()
        .test(
          'isValidAirlineCode',
          'Airline code not found!',
          validateAirlineCode,
        )
      : Yup.string()
        .uppercase(),
  },
)

import axios from 'axios'
import { SET_FLIGHT } from '../constants'

export const setFlight = flight => ({ type: SET_FLIGHT, flight })

export const checkFlight = (code, flightNum, year, month, day) => async dispatch => {
  return axios.get(`/api/flight/verify?code=${code}&flightNum=${flightNum}&year=${year}&month=${month}&day=${day}`)
    .then(response => {
      dispatch(setFlight(response.data))
    })
    .catch(() => {
      dispatch(setFlight(null))
    })
}

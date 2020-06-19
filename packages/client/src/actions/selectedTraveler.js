import axios from 'axios'
import { SET_SELECTED_TRAVELER } from '../constants'
import { setFlight } from './flight'

export const setSelectedTraveler = selectedTraveler => ({ type: SET_SELECTED_TRAVELER, selectedTraveler })

export const fetchSelectedTraveler = (id) => dispatch => {
  // return axios.get(`/api/traveler/${id}`, {
  //   headers: {
  //     Authorization: window.localStorage.accessToken
  //   }
  // })
  //   .then(traveler => {
  //     traveler = traveler.data
  //     dispatch(setSelectedTraveler(traveler))
  //     dispatch(setFlight(traveler.flight || {}))
  //   })
  //   .catch(err => console.error(err))
  const traveler = { id:'1231', email: '1234@abc.com', countryCode: '1', phone: '8084982097', name: 'Dirron Pewers', status: 'transit', connectivity: true, nationality: 'Syria', flightId: 1 }
  return dispatch(setSelectedTraveler(traveler))
  //dispatch(setFlight(traveler.flight || {}))
}

export const updateTraveler = (traveler, id, _window = window) => dispatch => {
  return axios.put(`/api/traveler/${id}`, traveler, {
    headers: { Authorization: _window.localStorage.accessToken }
  })
    .then(response => {
      traveler = response.data
      dispatch(setSelectedTraveler(traveler))
    })
    .catch(err => console.error(err))
}

export const sendText = (traveler, _window = window) => () => {
  return axios.post('/api/twilio/send',
    {
      to: `+${traveler.countryCode}${traveler.phone}`,
      message: `Hi ${traveler.name}, we have not heard from you yet. Please respond with 'ok' if you are through customs and immigration.`
    }, {
      headers: { Authorization: _window.localStorage.accessToken }
    })
    .then((res) => {
      console.log('message sent!', res.data)
    })
    .catch(err => console.error(err))
}

export const deleteTraveler = (id, _window = window) => dispatch => {
  return axios.delete(`/api/traveler/${id}`, {
    headers: { Authorization: _window.localStorage.accessToken }
  })
    .then((data) => {
      console.log('***********traveler deleted*************', data)
    })
    .catch(err => console.error(err))
}

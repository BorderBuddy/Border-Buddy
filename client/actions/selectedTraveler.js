import axios from 'axios';
import { SET_SELECTED_TRAVELER } from '../constants';
import { setFlight } from './flight';

export const setSelectedTraveler = selectedTraveler => ({ type: SET_SELECTED_TRAVELER, selectedTraveler });

export const fetchSelectedTraveler = (id) => dispatch => {
  return axios.get(`/api/traveler/${id}`)
  .then(traveler => {
    traveler = traveler.data;
    dispatch(setSelectedTraveler(traveler));
    dispatch(setFlight(traveler.flight));
  })
  .catch(err => console.error(err));
}

export const updateTraveler = (traveler, id) => dispatch => {
  return axios.put(`/api/traveler/${id}`, traveler)
  .then(traveler => {
    traveler = traveler.data;
    dispatch(setSelectedTraveler(traveler));
  })
  .catch(err => console.error(err));
}

export const sendText = (traveler) => dispatch => {
  return axios.post('/api/twilio/send', 
  {
    to: traveler.phone,
		message: `Hi ${traveler.name}, we have not heard from you yet. Please respond with 'ok' if you are through customs and immigration.`
  })
  .then((res) => {
    console.log('message sent!', res.data);
  })
  .catch(err => console.error(err));
}
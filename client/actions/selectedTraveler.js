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

export const updateTraveler = (traveler) => dispatch => {
  return axios.put(`/api/traveler/${traveler.id}`, traveler)
  .then(traveler => {
    traveler = traveler.data;
    dispatch(setSelectedTraveler(traveler));
  })
  .catch(err => console.error(err));
}
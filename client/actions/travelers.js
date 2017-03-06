import axios from 'axios';
import { SET_ALL_TRAVELERS } from '../constants';

export const setAllTravelers = (travelers) => ({ type: SET_ALL_TRAVELERS, travelers })

export const fetchAllTravelers = () => dispatch => {
  return axios.get('http://localhost:3000/api/traveler')
  .then(travelers => {
    dispatch(setAllTravelers(travelers.data))
  })
  .catch(err => console.error(err));
}
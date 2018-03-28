import axios from 'axios';
import { SET_ALL_TRAVELERS } from '../constants';

export const setAllTravelers = travelers => ({
  type: SET_ALL_TRAVELERS,
  travelers
});

export const fetchAllTravelers = () => dispatch => {
  return axios
    .get('/api/traveler', {
      headers: {
        Authorization: window.localStorage.accessToken
      }
    })
    .then(travelers => dispatch(setAllTravelers(travelers.data)))
    .catch(err => console.error(err.response.data));
};

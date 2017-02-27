import {
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAILURE
} from '../constants';

import axios from 'axios';


export const signUp = traveler => {
  return dispatch => {
		axios.post('/api/traveler/', traveler)
		.then(traveler => console.log('added a traveler to the db!', traveler))
		.catch(console.error)
  };
}

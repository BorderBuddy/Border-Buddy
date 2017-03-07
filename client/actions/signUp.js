import {
  SET_SIGNUP_TRAVELER,
  CLEAR_SIGNUP_TRAVELER
} from '../constants';

import axios from 'axios';
import { browserHistory } from 'react-router';

const setSignupTraveler = traveler => ({
	type: SET_SIGNUP_TRAVELER,
	traveler
});

export const signUpTraveler = traveler => {
  return dispatch => {
		axios.post('http://localhost:3000/api/traveler/', traveler)
		.then(res => {
			dispatch(setSignupTraveler(res.data));
			browserHistory.push('/success');
		})
		.catch(console.error);
  };
};

export const clearSignUpTraveler = () => ({
	type: CLEAR_SIGNUP_TRAVELER
});


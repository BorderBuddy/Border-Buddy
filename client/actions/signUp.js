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

export const signUpTraveler = (traveler, isAdmin) => {
  return dispatch => {
		axios.post('/api/traveler/', traveler)
		.then(res => {
			dispatch(setSignupTraveler(res.data));
			if(!isAdmin) browserHistory.push('/success');
		})
		.catch(console.error);
  };
};

export const clearSignUpTraveler = () => ({
	type: CLEAR_SIGNUP_TRAVELER
});


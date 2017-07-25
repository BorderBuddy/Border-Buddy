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
	if (traveler.countryCode[0] === '+') traveler.countryCode = traveler.countryCode.slice(1);
	console.log("CODE", traveler.countryCode);
  return dispatch => {
		axios.post('/api/traveler/', traveler)
		.then(res => {
			console.log(res);
			dispatch(setSignupTraveler(res.data));
			if(!isAdmin) browserHistory.push('/success');
			else {
				browserHistory.push('/admin/travelers')
			}
		})
		.then((res) => {
		})
		.catch(console.error);
  };
};

export const clearSignUpTraveler = () => ({
	type: CLEAR_SIGNUP_TRAVELER
});


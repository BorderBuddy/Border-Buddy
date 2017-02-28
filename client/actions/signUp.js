import {
  SET_TRAVELER
} from '../constants';

import axios from 'axios';


const setTraveler = traveler => ({
	type: SET_TRAVELER,
	traveler
})

export const signUp = traveler => {
  return dispatch => {
		axios.post('/api/traveler/', traveler)
		.then(traveler => setTraveler(traveler))
		.catch(console.error)
  };
}

import { SET_SIGNUP_TRAVELER } from '../constants';

export default (state = {}, action) => {
	switch(action.type) {
		case SET_SIGNUP_TRAVELER:
			return action.traveler;
		default:
			return state;
	}
}
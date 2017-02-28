import { SET_SELECTED_TRAVELER } from '../constants';

export default (state={}, action) => {
  switch(action.type) {
    case SET_SELECTED_TRAVELER:
      return action.selectedTraveler;
    default:
      return state;
  }
}
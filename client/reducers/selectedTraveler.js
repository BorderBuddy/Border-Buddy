import { SET_SELECTED_TRAVELER } from '../constants';

export default (state={ flight: {} }, action) => {
  switch(action.type) {
    case SET_SELECTED_TRAVELER:
      return action.selectedTraveler;
    default:
      return state;
  }
}
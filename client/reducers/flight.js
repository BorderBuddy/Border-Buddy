import {SET_FLIGHT} from '../constants';

export default (state = {}, action) => {
  switch (action.type) {
    case SET_FLIGHT:
      return action.flight;
    default:
      return state;
  }
};

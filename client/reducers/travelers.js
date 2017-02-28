import { SET_ALL_TRAVELERS } from '../constants';

export default (state=[], action) => {
  switch(action.type) {
    case SET_ALL_TRAVELERS:
      return action.travelers;
    default:
      return state;
  }
}
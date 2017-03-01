import { SET_AUTH } from '../constants';

export default (state={}, action) => {
  switch(action.type) {
    case SET_AUTH:
      return action.auth;
    default:
      return state;
  }
}
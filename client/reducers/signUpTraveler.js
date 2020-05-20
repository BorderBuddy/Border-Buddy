import { SET_SIGNUP_TRAVELER, CLEAR_SIGNUP_TRAVELER } from '../constants'

export default (state = null, action) => {
  switch (action.type) {
    case SET_SIGNUP_TRAVELER:
      return action.traveler
    case CLEAR_SIGNUP_TRAVELER:
      return null
    default:
      return state
  }
}

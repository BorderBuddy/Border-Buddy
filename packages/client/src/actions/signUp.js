import {
  SET_SIGNUP_TRAVELER,
  CLEAR_SIGNUP_TRAVELER
} from '../constants'

const setSignupTraveler = traveler => ({
  type: SET_SIGNUP_TRAVELER,
  traveler
})

export const signUpTraveler = traveler => {
  return dispatch => dispatch(setSignupTraveler(traveler))
}

export const clearSignUpTraveler = () => ({
  type: CLEAR_SIGNUP_TRAVELER
})

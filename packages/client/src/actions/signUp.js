import {
  SET_SIGNUP_TRAVELER,
  CLEAR_SIGNUP_TRAVELER
} from '../constants'

const setSignupTraveler = traveler => ({
  type: SET_SIGNUP_TRAVELER,
  traveler
})

export const signUpTraveler = res => {
  return dispatch => dispatch(setSignupTraveler(res.data))
}

export const clearSignUpTraveler = () => ({
  type: CLEAR_SIGNUP_TRAVELER
})

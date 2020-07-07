import {
  SET_SIGNUP_TRAVELER,
  CLEAR_SIGNUP_TRAVELER
} from '../constants'

import axios from 'axios'
// import { useHistory } from 'react-router-dom'

const setSignupTraveler = traveler => ({
  type: SET_SIGNUP_TRAVELER,
  traveler
})

export const signUpTraveler = (traveler, isAdmin) => {
  // const history = useHistory()
  if (traveler.countryCode[0] === '+') traveler.countryCode = traveler.countryCode.slice(1)
  // NOTE: we really should make the code an enum
  return dispatch => {
    axios.post('/api/traveler/', traveler)
      .then(res => {
        dispatch(setSignupTraveler(res.data))
        // if (!isAdmin) history.push('/success')
        // else history.push('/admin/travelers')
      })
      .catch(console.error)
  }
}

export const clearSignUpTraveler = () => ({
  type: CLEAR_SIGNUP_TRAVELER
})

import {
  SET_SIGNUP_TRAVELER,
  CLEAR_SIGNUP_TRAVELER
} from '../constants'

import axios from 'axios'
// FIXME: This hook causes an error at the moment
// import { useHistory } from 'react-router-dom'

const setSignupTraveler = traveler => ({
  type: SET_SIGNUP_TRAVELER,
  traveler
})

export const signUpTraveler = (traveler, isAdmin) => {
  // const history = useHistory()
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

// export const signUpTraveler = res => {
//   return dispatch => dispatch(setSignupTraveler(res.data))
// }

export const clearSignUpTraveler = () => ({
  type: CLEAR_SIGNUP_TRAVELER
})

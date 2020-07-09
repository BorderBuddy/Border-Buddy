import axios from 'axios'
import {
  SET_AUTH,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
} from '../constants'

export const setAuth = (auth) => ({ type: SET_AUTH, auth })
export const loginRequest = () => ({
  type: LOGIN_REQUEST,
  payload: {
    fetching: true,
  },
  error: false,
})

export const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  payload: {
    fetching: false,
    user,
  },
  error: false,
})

export const loginFailure = (message) => ({
  type: LOGIN_FAILURE,
  payload: {
    error: new Error(message),
    fetching: false,
  },
  error: true,
})

export const logout = () => ({
  type: LOGOUT,
  payload: {
    fetching: false,
  },
  error: false,
})

// export const login = (res) => (dispatch) => {
//   dispatch(loginRequest())
//   dispatch(loginSuccess(res))
// }

export const signup = (user, _window = window) => () => {
  return axios
    .post('/api/user', user)
    .catch((err) => console.error('ERROR!', err))
}

export const signout = () => (dispatch) => {
  dispatch(logout(null))
}

export const whoAmI = () => (dispatch) => {
  return axios
    .get('/api/auth/checkToken')
    .then((res) => {
      dispatch(setAuth(res.data))
    })
    .catch((err) => console.error(err))
}

export const updateUser = (user) => (dispatch) => {
  return axios
    .put(`/api/user/${user.id}`, user)
    .then((res) => {
      dispatch(setAuth(res.data))
    })
}

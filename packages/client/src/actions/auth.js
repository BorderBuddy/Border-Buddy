import axios from "axios"
import { push } from "react-router-redux"

import {
  SET_AUTH,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
} from "../constants"

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

export const login = (email, password, props) => (dispatch) => {
  dispatch(loginRequest())
  return axios
    .post("/api/auth/local", { email, password })
    .then((response) => {
      window.localStorage.setItem("accessToken", response.data.token)
      dispatch(loginSuccess(response.data))
      dispatch(push("/travelers"))
      return true
    })
    .catch((err) => {
      console.log(err)
      return dispatch(loginFailure(err.response.data.message))
    })
}

export const signup = (user, _window = window) => () => {
  return axios
    .post("/api/user", user, {
      headers: {
        Authorization: _window.localStorage.accessToken,
      },
    })
    .catch((err) => console.error("ERROR!", err))
}

export const checkToken = () => async (dispatch, getState) => {
  const res = await axios.get("/api/auth/checkToken", {
    headers: {
      Authorization: getState().auth.user.token,
    }
  })
  try {
    if (res.status === 200) {
      dispatch(loginSuccess(res.data))
      return res.status
    } else {
      dispatch(loginFailure(res.data.message))
      return false
    }
  } catch (err) {
    dispatch(loginFailure(err.res.data.message))
    return err
  }
}

export const signout = () => (dispatch) => {
  axios
    .post("/api/auth/logout")
    .then(() => {
      window.localStorage.clear()
      dispatch(logout(null))
      dispatch(push("/login"))
    })
    .catch((err) => console.error(err))
}

export const whoAmI = () => (dispatch) => {
  return axios
    .get("/api/auth/checkToken", {
      headers: {
        Authorization: window.localStorage.accessToken,
      },
    })
    .then((res) => {
      dispatch(setAuth(res.data))
    })
    .catch((err) => console.error(err))
}

export const updateUser = (user) => (dispatch) => {
  return axios
    .put(`/api/user/${user.id}`, user, {
      headers: {
        Authorization: window.localStorage.accessToken,
      },
    })
    .then((res) => {
      dispatch(setAuth(res.data))
    })
}

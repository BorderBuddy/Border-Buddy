import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT
} from '../constants'

const INITIAL_AUTH_STATE = {
  user: {
    email: '',
    id: 0,
    phone: '',
    token: window.localStorage.accessToken
      ? window.localStorage.accessToken
      : ''
  },
  fetching: false,
  error: null
}

const loginRequest = (state, { payload: { fetching }, error }) => ({
  ...state,
  fetching,
  error
})

const loginSuccess = (state, { payload: { fetching, user }, error }) => ({
  ...state,
  fetching,
  error,
  user
})

const loginFailure = (state, { payload: { fetching, error } }) => ({
  ...state,
  fetching,
  error
})
const logout = (state, { payload: { fetching }, error }) => ({
  ...state,
  fetching,
  error
})

export default (state = INITIAL_AUTH_STATE, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return loginRequest(state, action)
    case LOGIN_SUCCESS:
      return loginSuccess(state, action)
    case LOGIN_FAILURE:
      return loginFailure(state, action)
    case LOGOUT:
      return logout(state, action)
    default:
      return state
  }
}

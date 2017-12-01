import {
  SET_AUTH,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE
} from '../constants';

const INITIAL_AUTH_STATE = {
  user: {
    email: '',
    id: 0,
    phone: '',
    tokenResponse: ''
  },
  fetching: false,
  error: null
};

const loginRequest = (state, { payload: { fetching }, error }) => ({
  ...state,
  fetching,
  error
});

const loginSuccess = (state, { payload: { fetching, user }, error }) => ({
  ...state,
  fetching,
  error,
  user
});

const loginFailure = (state, { payload: { fetching, error } }) => ({
  ...state,
  fetching,
  error
});

export default (state = INITIAL_AUTH_STATE, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return loginRequest(state, action);
    case LOGIN_SUCCESS:
      return loginSuccess(state, action);
    case LOGIN_FAILURE:
      return loginFailure(state, action);
    default:
      return state;
  }
};

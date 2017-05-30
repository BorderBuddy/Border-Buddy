import axios from 'axios';
import {browserHistory} from 'react-router';
import {SET_AUTH} from '../constants';

export const setAuth = auth => ({type: SET_AUTH, auth});

export const login = (user) => dispatch => {
  return axios.post('/api/auth/local', user)
    .then(response => {
      window.localStorage.setItem('accessToken', response.data.token);
      dispatch(setAuth(response.data));
      browserHistory.push('/admin/travelers');
    })
    .catch(err => console.error('ERROR!!!', err));
};

export const signup = (user, _window = window) => () => {
  console.log(user, "USER!!!")
  return axios.post('/api/user', user, {
    headers: {
      Authorization: _window.localStorage.accessToken
    }
  })
    .catch(err => console.error('ERROR!', err));
};

export const checkToken = () => dispatch => {
  return axios.get('/api/auth/checkToken', {
    headers: {
      Authorization: window.localStorage.accessToken
    }
  })
    .then(response => {
      console.log("OWIEJFOISJEFOIEJF", response.data);
      dispatch(setAuth(response.data));
    });
};

export const signout = () => dispatch => {
  axios.post('/api/auth/logout')
    .then(() => {
      window.localStorage.clear();
      dispatch(setAuth(null));
      browserHistory.push('/login');
    })
    .catch(err => console.error(err));
};

export const whoAmI = () => (dispatch, getState) => {
  // if (!getState().auth.id) return new Promise((resolve, reject) => (resolve()))
  return axios.get('/api/auth/checkToken', {
    headers: {
      Authorization: window.localStorage.accessToken
    }
  })
  .then((res) => {
    dispatch(setAuth(res.data))
  })
  .catch(err => console.error(err));
};

export const updateUser = (user) => dispatch => {
  console.log("USER IN ACTIONSSS", user);
  return axios.put(`/api/user/${user.id}`, user, {
    headers: {
      Authorization: window.localStorage.accessToken
    }
  })
  .then(res => {
    console.log(res);
    dispatch(setAuth(res.data));
  })
};

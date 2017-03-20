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
    .catch(err => console.error("ERROR!!!", err));
}

export const signup = (user, _window = window) => dispatch => {
  return axios.post('/api/user', user, {
    headers: {
     'Authorization': _window.localStorage.accessToken
    }
  })
    .catch(err => console.error("ERROR!", err));
}

export const checkToken = () => dispatch => {
  return axios.get('/api/auth/checkToken', {
    headers: {
      'Authorization': window.localStorage.accessToken
    }
  })
    .then(response => {
      dispatch(setAuth(response.data));
    })
}

export const signout = () => dispatch => {
  axios.post('/api/auth/logout')
    .then(() => {
      window.localStorage.clear()
      dispatch(setAuth(null));
      browserHistory.push('/login')
    })
    .catch(err => console.error(err));
}

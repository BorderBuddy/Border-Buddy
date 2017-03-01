import axios from 'axios';
import { browserHistory } from 'react-router';
import { SET_AUTH } from '../constants';

export const setAuth = auth => ({ type: SET_AUTH, auth });

export const login = (user) => dispatch => {
  return axios.post('http://localhost:3000/api/auth/local', user)
  .then(user => {
    dispatch(setAuth(user.data));
    browserHistory.push('/admin');
  })
  .catch(err => console.error("ERROR!!!", err));
}

export const signup = (user) => dispatch => {
  return axios.post('http://localhost:3000/api/user', user)
  .then(user => {
    dispatch(setAuth(user.data));
    browserHistory.push('/admin');
  })
  .catch(err => console.error("ERROR!", err));
}
import axios from 'axios';
import { browserHistory } from 'react-router';
import { SET_AUTH } from '../constants';

export const setAuth = auth => ({ type: SET_AUTH, auth });

export const login = (user) => dispatch => {
  return axios.post('http://localhost:3000/api/auth/local', user)
  .then(response => {
    window.sessionStorage.accessToken = response.data.token;
    dispatch(setAuth(response.data));
    browserHistory.push('/admin');
  })
  .catch(err => console.error("ERROR!!!", err));
}

export const signup = (user) => dispatch => {
  return axios.post('http://localhost:3000/api/user', user)
  .then(response => {
    Storage.setItem(accessToken, response.data.token);
    dispatch(setAuth(response.data));
    browserHistory.push('/admin');
  })
  .catch(err => console.error("ERROR!", err));
}

export const tokenQuery = axios.create({
  baseURL: 'http://localhost:3000/api/auth/checkToken',
  timeout: 1000,
  headers: { 'Authorization': window.sessionStorage.accessToken }
})

export const checkToken = () => dispatch => {
  console.log('yo');
  return tokenQuery.post('')
  .then(response => {
    dispatch(setAuth(response.data));
  })
}
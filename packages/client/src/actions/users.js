import axios from 'axios'
import { SET_ALL_USERS } from '../constants'

export const fetchAllUsers = (_window = window) => dispatch => {
  return axios.get('/api/user')
    .then(response => dispatch({ type: SET_ALL_USERS, users: response.data }))
    .catch(err => console.error(err))
}

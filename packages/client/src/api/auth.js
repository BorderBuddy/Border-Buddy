import axios from 'axios'
import {
  setLoginTokens,
  saveUser,
  loginCallback,
  logout
} from '../auth/authService'

const api = {
  login: async (email, password) => {
    try {
      const res = await axios.post('/api/auth/local', { email, password })
      setLoginTokens(res.data.token)
      saveUser(res.data.id)
      if (loginCallback) {
        loginCallback(res.data.id)
      }
      return res.data
    } catch (err) {
      return err
    }
  },
  logout: async () => {
    try {
      const res = await axios.post('/api/auth/logout')
      logout()
      window.localStorage.clear()
      return res.data
    } catch (err) {
      return err
    }
  },
  verify: async (userAttributes) => {
    try {
      const res = await axios.post('/api/auth/verify', userAttributes)
      return res.data
    } catch (err) {
      return err
    }
  },
  forgot: async (userAttributes) => {
    try {
      const res = await axios.post('/api/auth/forgot', userAttributes)
      return res.data
    } catch (err) {
      return err
    }
  },
  checkToken: async () => {
    try {
      const res = await axios.get('/api/auth/checkToken')
      saveUser(res.data.id)
      if (loginCallback) {
        loginCallback(res.data.id)
      }
      return res.data
    } catch (err) {
      return err
    }
  }
}
export default api

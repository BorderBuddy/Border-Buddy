import React from 'react'
import axios from 'axios'

const ID_TOKEN_KEY = 'Authorization'

function saveUser (userID: any) {
  localStorage.setItem('User', JSON.stringify(userID))
}

function logout () {
  clearTokens()
  if (loginCallback) {
    loginCallback(null)
  }
}

function requireAuth (nextState: any, replace: any) {
  if (!isLoggedIn()) {
    replace({ pathname: '/login' })
  }
}

type LoginCallback = (userID: any | null) => void

let loginCallback: LoginCallback | null = null

function setLoginCallback (callback: LoginCallback) {
  loginCallback = callback
}

function clearTokens () {
  localStorage.removeItem(ID_TOKEN_KEY)
}

// Get and store id_token in local storage
function setLoginTokens (tokens: any) {
  localStorage.setItem(ID_TOKEN_KEY, JSON.stringify(tokens))
  setBearer()
}

function setBearer () {
  const bearer = getToken()
  // console.log(bearer)

  if (bearer) {
    axios.defaults.headers.common.Authorization = bearer
  }
}

function getToken () {
  const json = localStorage.getItem(ID_TOKEN_KEY)
  if (!json) {
    return null
  }

  let token
  try {
    token = JSON.parse(json)
  } catch (err) {
    return null
  }

  return token
}

function isLoggedIn () {
  const token = getToken()
  return isTokenValid(token)
}

function loggedInUser () {
  if (!isLoggedIn()) {
    return null
  }

  const user = localStorage.getItem('User')
  if (user) {
    return user
  }

  return null
}
// TODO: add expiration handling for Bearer token
function isTokenValid (token: any) {
  return !!token && !isTokenExpired(token)
}
/*
function getTokenExpirationDate(token) {
  const date = new Date(0);
  date.setUTCSeconds(token.expires_at);

  return date;
}
*/
function isTokenExpired (token: any) {
  return false
  /*
  if (token.expires_at == null) {
    return false;
  }
  const expirationDate = getTokenExpirationDate(token);
  return expirationDate < new Date();
  */
}

class LoggedIn extends React.Component {
  render () {
    return isLoggedIn() ? this.props.children : null
  }
}

class LoggedOut extends React.Component {
  render () {
    return !isLoggedIn() ? this.props.children : null
  }
}

function setup () {
  const resetAuth = false

  if (resetAuth) {
    clearTokens()
  }

  setBearer()
}

setup()

export {
  logout,
  setLoginTokens,
  setLoginCallback,
  isLoggedIn,
  saveUser,
  requireAuth,
  loggedInUser,
  loginCallback,
  LoggedIn,
  LoggedOut
}

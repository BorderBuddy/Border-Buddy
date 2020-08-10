import 'isomorphic-fetch'
import React, { Component, useContext, useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import configureStore from './store'
import { Provider } from 'react-redux'
import { MuiThemeProvider } from '@material-ui/core/styles'
import customTheme from './utils/muiTheme'
import api from './api/api'
import { loggedInUser, setLoginCallback } from './auth/authService'
import { User } from './models/models'

// Components
import { Layout } from './containers/Layout'
import {UserContext, UserProvider} from './UserContext'

require('./style/index.scss')

export const store = configureStore()

// interface AppState {
//   ready: boolean
//   user: any | null
// }

export const App = () => {
  const [ready, setReady] = useState(false)
  const {user, setCurrUser} = useContext(UserContext)
  // const [user, setUser] = useState<User>()
  // const {setUser} = useContext(UserContext)

  // state: AppState = {
  //   ready: false,
  //   user: loggedInUser(),
  // }

  // constructor (props: any, context: any) {
  //   super(props, context)
  //   setLoginCallback(this.onLoginChange.bind(this))
  // }

  // onLoginChange (user: any) {
  //   this.setState({ user })
  // }

  useEffect(() => {
    const checkToken = async () => {
      const user = await api.checkToken()
      setCurrUser(user)
    }
    checkToken()
  }, [])

  return (
    <MuiThemeProvider theme={customTheme}>
      <Provider store={store}>
        <Router>
          <Layout/>
        </Router>
      </Provider>
    </MuiThemeProvider>
  )
}

ReactDOM.render(<UserProvider><App /></UserProvider>, document.getElementById('root'))

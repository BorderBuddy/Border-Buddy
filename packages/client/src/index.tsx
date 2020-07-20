import 'isomorphic-fetch'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import configureStore from './store'
import { Provider } from 'react-redux'
import { MuiThemeProvider } from '@material-ui/core/styles'
import customTheme from './utils/muiTheme'
import api from './api/api'
import { loggedInUser, setLoginCallback } from './auth/authService'

// Components
import { Layout } from './containers/Layout'
import UserContext from './userContext'

require('./style/index.scss')

export const store = configureStore()

interface AppState {
  ready: boolean
  user: any | null
}

class App extends Component {
  state: AppState = {
    ready: false,
    user: loggedInUser(),
  }

  constructor (props: any, context: any) {
    super(props, context)
    setLoginCallback(this.onLoginChange.bind(this))
  }

  onLoginChange (user: any) {
    this.setState({ user })
  }

  async componentDidMount () {
    const user = await api.checkToken()
    this.setState({ ready: true, user })
  }

  render () {
    return (
      <MuiThemeProvider theme={customTheme}>
        <Provider store={store}>
          <Router>
            <UserContext.Provider value={ { user: this.state.user ? this.state.user : {} } }>
              <Layout/>
            </UserContext.Provider>
          </Router>
        </Provider>
      </MuiThemeProvider>
    )
  }
}
ReactDOM.render(<App />, document.getElementById('root'))

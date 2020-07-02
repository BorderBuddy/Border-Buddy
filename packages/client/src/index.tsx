import 'isomorphic-fetch'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import configureStore, { history } from './store'
import { Provider } from 'react-redux'
import { MuiThemeProvider } from '@material-ui/core/styles'
import customTheme from './utils/muiTheme'
import api from './api/api'

// Components
import { Homepage } from './containers/Homepage'
import AdminContainer from './containers/AdminContainer'
import AllTravelers from './containers/AllTravelers'
import SingleTravelerContainer from './containers/SingleTravelerContainer'
import Login from './containers/Login'
import AdminSignUp from './containers/AdminSignUpContainer'
import UpdateUserContainer from './containers/UpdateUserContainer'
import Success from './containers/Success'
import ConnectedSignUpContainer from './connectedComponents/ConnectedSignUpContainer'
import AddTravelerContainer from './containers/AddTravelerContainer'
import { About } from './components/About'
import { WhyBorderBuddy } from './components/WhyBorderBuddy'
import { LoggedIn, LoggedOut, loggedInUser, setLoginCallback } from './auth/AuthService'
import UserContext from './userContext'

// Router Hooks
import {
  onSuccessEnter,
  onTravelersListEnter,
  onSingleTravelerEnter,
} from './utils/hooks'
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
    const user = await api.checkToken(this.props)
    this.setState({ ready: true, user })
  }

  render () {
    return (
      <MuiThemeProvider theme={customTheme}>
        <Provider store={store}>
          <Router>
            <UserContext.Provider value={ { user: this.state.user ? this.state.user : {} } }>
              <LoggedIn>
                <AdminContainer {...this.props}>
                  <Switch>
                    <Route exact path="/traveler/add"><AddTravelerContainer /></Route>
                    <Route exact path="/travelers/:id" render={(props) => {
                      onSingleTravelerEnter(props)
                      return <SingleTravelerContainer {...props} />
                    }} />
                    <Route exact path="/travelers" render={(props) => {
                      onTravelersListEnter()
                      return <AllTravelers {...props} />
                    }} />
                    <Route exact path="/createuser"><AdminSignUp /></Route>
                    <Route exact path="/updateprofile"><UpdateUserContainer /></Route>
                    <Route render={() => {
                      onTravelersListEnter()
                      return <AllTravelers />
                    }} />
                  </Switch>
                </AdminContainer>
              </LoggedIn>
              <LoggedOut>
                <Homepage>
                  <Switch>
                    <Route exact path="/why" ><WhyBorderBuddy /></Route>
                    <Route exact path="/register" ><ConnectedSignUpContainer /></Route>
                    <Route exact path="/about" ><About /></Route>
                    <Route exact path="/login" render={(props) => {
                      return <Login {...props} />
                    }} />
                    <Route exact path='/success' render={() => {
                      onSuccessEnter()
                      return <Success />
                    }} />
                    <Route component={WhyBorderBuddy} />
                  </Switch>
                </Homepage>
              </LoggedOut>
            </UserContext.Provider>
          </Router>
        </Provider>
      </MuiThemeProvider>
    )
  }
}
ReactDOM.render(<App />, document.getElementById('root'))
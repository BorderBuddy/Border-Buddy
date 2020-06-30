import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

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

// Router Hooks
import {
  onSuccessEnter,
  onTravelersListEnter,
  onSingleTravelerEnter,
  loggedIn
} from './utils/hooks'
import { PersonPinSharp } from '@material-ui/icons'

class GetRoutes extends Component {
  state={
    loggedInState: false,
    ready: false
  }

  async componentWillMount () {
    const isloggedin = await loggedIn()
    this.setState({ loggedInState: isloggedin })
  }

  render () {
    if (this.state.loggedInState) {
      return <LoggedInApp/>
    } else {
      return <LoggedOutApp/>
    }
  }
}
export default GetRoutes

const LoggedInApp = () => {
  return (
    <AdminContainer {...this.props}>
      <Switch>
        <Route exact path="/traveler/add"><AddTravelerContainer/></Route>
        <Route exact path="/travelers/:id" render={(props) => {
          onSingleTravelerEnter(props)
          return <SingleTravelerContainer {...props}/>
        }} />
        <Route exact path="/travelers" render={(props) => {
          onTravelersListEnter()
          return <AllTravelers {...props}/>
        }} />
        <Route exact path="/createuser"><AdminSignUp/></Route>
        <Route exact path="/updateprofile"><UpdateUserContainer/></Route>
        <Route render={() => {
          onTravelersListEnter()
          return <AllTravelers/>
        }} />
      </Switch>
    </AdminContainer>
  )
}
const LoggedOutApp = () => {
  return (
    <Homepage>
      <Switch>
        <Route path="/why" component={WhyBorderBuddy}/>
        <Route path="/register" component={ConnectedSignUpContainer}/>
        <Route path="/about" component={About}/>
        <Route path="/login" component={Login} />
        <Route path='/success' render={() => {
          onSuccessEnter()
          return <Success/>
        }}/>
        <Route component={WhyBorderBuddy} />
      </Switch>
    </Homepage>
  )
}

import React from 'react'
import { Route, Switch } from 'react-router-dom'

// Components
import AllTravelers from './containers/AllTravelers'
import SingleTravelerContainer from './containers/SingleTravelerContainer'
import Login from './containers/Login'
import AdminSignUp from './containers/AdminSignUpContainer'
import UpdateUserContainer from './containers/UpdateUserContainer'
import { Success } from './components/Success'
import AddTravelerContainer from './containers/AddTravelerContainer'
import { About } from './components/About'
import { WhyBorderBuddy } from './components/WhyBorderBuddy'
import { LoggedIn } from './auth/authService'
import RegisterForm from './components/RegisterForm'

// Router Hooks
import {
  onTravelersListEnter,
  onSingleTravelerEnter,
} from './utils/hooks'

export const getRoutes = () => (
  <Switch>
    {/* TODO: add actual homepage */}
    <Route exact path="/" ><WhyBorderBuddy /></Route>
    <Route exact path="/why" ><WhyBorderBuddy /></Route>
    <Route exact path="/register"><RegisterForm/></Route>
    <Route exact path="/about" ><About /></Route>
    <Route exact path="/login"><Login/></Route>
    <Route exact path='/success'><Success/></Route>
    <LoggedIn>
      <Route exact path="/traveler/add"><RegisterForm/></Route>
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
    </LoggedIn>
    <Route component={WhyBorderBuddy} />
  </Switch>
)

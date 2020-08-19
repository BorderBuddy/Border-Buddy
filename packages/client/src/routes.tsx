import React from 'react'
import { Route, Switch } from 'react-router-dom'

// Components
import { AllTravelers } from './containers/AllTravelers'
import { SingleTravelerContainer } from './containers/SingleTravelerContainer'
import { Login } from './containers/Login'
import AdminSignUp from './containers/AdminSignUpContainer'
import UpdateUserContainer from './containers/UpdateUserContainer'
import { Success } from './components/Success'
import { About } from './components/static/About'
import { WhyBorderBuddy } from './components/static/WhyBorderBuddy'
import { LoggedIn } from './auth/authService'
import { RegisterForm } from './components/forms/RegisterForm'

export const getRoutes = () => (
  <Switch>
    <Route exact path="/" ><WhyBorderBuddy /></Route>
    <Route exact path="/why" ><WhyBorderBuddy /></Route>
    <Route exact path="/register"><RegisterForm formTitle='Traveler Registration' isAdmin={false}/></Route>
    <Route exact path="/about" ><About /></Route>
    <Route exact path="/login"><Login/></Route>
    <Route exact path='/success'><Success/></Route>
    <LoggedIn>
      <Route exact path="/traveler/add"><RegisterForm formTitle='Traveler Registration' isAdmin={true}/></Route>
      <Route path="/travelers/:id"><SingleTravelerContainer/></Route>
      <Route exact path="/travelers"><AllTravelers/></Route>
      <Route exact path="/createuser"><AdminSignUp /></Route>
      <Route exact path="/updateprofile"><UpdateUserContainer /></Route>
    </LoggedIn>
    <Route component={WhyBorderBuddy} />
  </Switch>
)

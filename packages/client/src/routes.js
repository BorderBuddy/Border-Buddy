import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'

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

export const getRoutes = () => {
  if (loggedIn()) {
    return (
      <AdminContainer>
        <Switch>
          <Route exact path="/admin/travelers/add" component={AddTravelerContainer} />
          <Route path="/admin/travelers/:id" render={(props) => {
            onSingleTravelerEnter(props)
            return <SingleTravelerContainer {...props}/>
          }} />
          <Route path="/admin/travelers" render={() => {
            onTravelersListEnter()
            return <AllTravelers/>
          }} />
          <Route exact path="/admin/createuser" component={AdminSignUp} />
          <Route exact path="/admin/updateprofile" component={UpdateUserContainer} />
          <Route component={WhyBorderBuddy} />
        </Switch>
      </AdminContainer>
    ) 
  } else {
    return (
      <Homepage>
        <Switch>
          <Route exact path="/why" component={WhyBorderBuddy}/>
          <Route exact path="/register" component={ConnectedSignUpContainer}/>
          <Route exact path="/about" component={About}/>
          <Route exact path="/login" component={Login} />
          <Route exact path='/success' render={() => {
            onSuccessEnter()
            return <Success/>
          }}/>
          <Route component={WhyBorderBuddy} />
        </Switch>
      </Homepage>
    )
  }
}

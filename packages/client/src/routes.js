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
  onSuccessLeave,
  onAdminEnter,
  onTravelersListEnter,
  onSingleTravelerEnter
} from './utils/hooks'

export const getRoutes = () => (
  // <Homepage>
  //   <Switch>
  //     <Route path="/why" component={WhyBorderBuddy}/>
  //     <Route path="/register" component={ConnectedSignUpContainer}/>
  //     <Route path="/about" component={About}/>
  //     <Route path="/login" component={Login} />
  //     <Route component={WhyBorderBuddy} />
  //   </Switch>
  // </Homepage>
  <AdminContainer>
    <Switch>
      {/* <Route path="/admin" component={AdminContainer} /> */}
      <Route path="/admin/travelers" render={() => {
        onTravelersListEnter()
        return <AllTravelers/>
        }} />
      <Route path="/admin/travelers/add" component={AddTravelerContainer} />
      <Route path="/admin/travelers/:id" component={SingleTravelerContainer} onEnter={onSingleTravelerEnter} />
      <Route path="/admin/createuser" component={AdminSignUp} />
      <Route path="/admin/updateprofile" component={UpdateUserContainer} />
      <Route component={WhyBorderBuddy} />
    </Switch>
  </AdminContainer>
)
 {/* <Route path="success" component={Success} onEnter={onSuccessEnter} onLeave={onSuccessLeave} /> */}  
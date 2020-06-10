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
  <Switch>
    <Route path="/why" component={WhyBorderBuddy}/>
    <Route path="/register" component={ConnectedSignUpContainer}/>
    <Route path="/about" component={About}/>
    <Route component={WhyBorderBuddy} />

    {/* <Route path="success" component={Success} onEnter={onSuccessEnter} onLeave={onSuccessLeave} /> */}
    {/* <Route path="/admin" component={AdminContainer} onEnter={onAdminEnter}>
    <IndexRedirect to="/admin/travelers" />
    <Route path="travelers" component={AllTravelers} onEnter={onTravelersListEnter} />
    <Route path="travelers/add" component={AddTravelerContainer} />
    <Route path="travelers/:id" component={SingleTravelerContainer} onEnter={onSingleTravelerEnter} />
    <Route path="createuser" component={AdminSignUp} />
    <Route path="updateprofile" component={UpdateUserContainer} />
    </Route>
    <Route path="/login" component={Login} /> */}
  </Switch>
)

// const App = () => (
//   <Switch>
//     <Route exact path="/" component={Home} />
//     <Route path="/about" component={About} />
//     <Route path="/contact" component={Contact} />
//   </Switch>
// )

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



class GetRoutes extends Component {
  state={
    loggedInState: false,
    ready: false,
  }
  async componentDidMount(){
    const isloggedin = await loggedIn()
    console.log("IS LOGGED IN: "+isloggedin)
    this.setState({ready: true, loggedInState: isloggedin})
  }
  render () { 
    if(this.state.ready && this.state.loggedInState){
      return <LoggedInApp/>
    } else {
      return <LoggedOutApp/>
    }
  }
}
export default GetRoutes

const LoggedInApp = () => {
  return (
    <AdminContainer>
      <Switch>
        <Route path="/admin/travelers/add"><AddTravelerContainer/></Route>
        <Route path="/admin/travelers/:id" render={(props) => {
          onSingleTravelerEnter(props)
          return <SingleTravelerContainer {...props}/>
        }} />
        <Route path="/admin/travelers" render={() => {
          onTravelersListEnter()
          return <AllTravelers/>
        }} />
        <Route path="/admin/createuser"><AdminSignUp/></Route>
        <Route path="/admin/updateprofile"><UpdateUserContainer/></Route>
        <Route component={WhyBorderBuddy} />
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

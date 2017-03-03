import React from "react";
import { Route, browserHistory } from "react-router";
import {store} from './index';

// Components
import Homepage from "./containers/Homepage";
import AllTravelers from "./containers/AllTravelers";
import SingleTraveler from "./containers/SingleTraveler";
import Login from './containers/Login';
import AdminSignup from './containers/AdminSignUp';

// thunk action creators
import { fetchAllTravelers } from './actions/travelers';
import { fetchSelectedTraveler } from './actions/selectedTraveler';
import { checkToken } from './actions/auth';

const onTravelersListEnter = () => {
	if(!window.sessionStorage.accessToken) {
		browserHistory.push('/login')
	} else {
		store.dispatch(fetchAllTravelers())
	}
}

const onSingleTravelerEnter = ({ params }) => {
	if(!store.getState().auth.token) {
		browserHistory.push('/login')
	} else {
		store.dispatch(fetchSelectedTraveler(params.id))
	}
}

const onLoginEnter = () => {
	store.dispatch(checkToken())
}

const getRoutes = () => (
	<div>
	  <Route path='/' component={Homepage} />
	  <Route path='/admin' component={AllTravelers} onEnter={onTravelersListEnter} />
    <Route path='/admin/:id' component={SingleTraveler} onEnter={onSingleTravelerEnter} />
    <Route path='/login' component={Login} onEnter={onLoginEnter} />
		<Route path='/signup' component={AdminSignup} />
	</div>
);

export default getRoutes;

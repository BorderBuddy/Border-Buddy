import React from "react";
import { Route, browserHistory } from "react-router";
import {store} from './index';

// Components
import Homepage from "./containers/Homepage";
import AdminContainer from './containers/AdminContainer';
import AllTravelers from "./containers/AllTravelers";
import SingleTraveler from "./containers/SingleTraveler";
import Login from './containers/Login';
import AdminSignup from './containers/AdminSignUp';

// thunk action creators
import { fetchAllTravelers } from './actions/travelers';
import { fetchSelectedTraveler } from './actions/selectedTraveler';
import { checkToken } from './actions/auth';

const onAdminEnter = () => {
	store.dispatch(checkToken())
	.then(() => {
		if(!window.localStorage.accessToken) {
			browserHistory.push('/login');
		}
	})
	.catch(err => {
		console.error("Cookie Expired", err);
		browserHistory.push('/login');
	})
}

const onTravelersListEnter = () => {
	store.dispatch(fetchAllTravelers())
}

const onSingleTravelerEnter = ({ params }) => {
	store.dispatch(fetchSelectedTraveler(params.id))
}

const getRoutes = () => (
	<div>
	  <Route path='/' component={Homepage} />
		<Route path='/admin' component={AdminContainer} onEnter={onAdminEnter}>
	  	<Route path='travelers' component={AllTravelers} onEnter={onTravelersListEnter} />
    	<Route path='travelers/:id' component={SingleTraveler} onEnter={onSingleTravelerEnter} />
			<Route path='createuser' component={AdminSignup} />
		</Route>
    <Route path='/login' component={Login} />
	</div>
);

export default getRoutes;

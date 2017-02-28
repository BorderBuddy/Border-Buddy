import React from "react";
import { Route } from "react-router";
import {store} from './index';

// Components
import Homepage from "./containers/Homepage";
import AllTravelers from "./containers/AllTravelers";
import SingleTraveler from "./containers/SingleTraveler";
import Login from './containers/Login';

// thunk action creators
import { fetchAllTravelers } from './actions/travelers';
import { fetchSelectedTraveler } from './actions/selectedTraveler';

const onTravelersListEnter = () => {
	store.dispatch(fetchAllTravelers())
}

const onSingleTravelerEnter = ({ params }) => {
	store.dispatch(fetchSelectedTraveler(params.id))
}

const getRoutes = () => (
	<div>
	  <Route path='/' component={Homepage} />
	  <Route path='/admin' component={AllTravelers} onEnter={onTravelersListEnter} />
    <Route path='/admin/:id' component={SingleTraveler} onEnter={onSingleTravelerEnter} />
    <Route path='/admin/login' component={Login} />
	</div>
);

export default getRoutes;

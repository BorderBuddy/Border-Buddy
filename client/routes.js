import React from "react";
import { Route } from "react-router";
import SignUp from "./containers/SignUp";
import AllTravelers from "./containers/AllTravelers";
import SingleTraveler from "./containers/SingleTraveler"

const getRoutes = () => (
	<div>
	  <Route path='/' component={SignUp} />
	  <Route path='/admin' component={AllTravelers} />
    <Route path='/admin/:id' component={SingleTraveler} />
	</div>
);

export default getRoutes;
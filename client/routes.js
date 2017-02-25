import React from "react";
import { Route } from "react-router";
import SignUp from "./containers/SignUp";
import Admin from "./containers/Admin";

const getRoutes = () => (
	<div>
	  <Route path='/' component={SignUp} />
	  <Route path='/admin' component={Admin} />
	</div>
);

export default getRoutes;

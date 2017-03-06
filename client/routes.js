import React from 'react';
import { Route, IndexRedirect } from 'react-router';

// Components
import Homepage from './containers/Homepage';
import AdminContainer from './containers/AdminContainer';
import AllTravelers from './containers/AllTravelers';
import SingleTraveler from './containers/SingleTraveler';
import Login from './containers/Login';
import AdminSignUp from './containers/AdminSignUp';
import Success from './containers/Success';
import SignUp from './containers/SignUp';

import About from './components/About';
import WhyBorderBuddy from './components/WhyBorderBuddy';

// Router Hooks
import { onSuccessEnter, onSuccessLeave, onAdminEnter,
				 onTravelersListEnter, onSingleTravelerEnter } from './utils/hooks';

const getRoutes = () => (
	<div>
	  <Route path="/" component={Homepage}>
			<IndexRedirect to="/why" />
			<Route path="why" component={WhyBorderBuddy} />
			<Route path="register" component={SignUp} />
			<Route path="about" component={About} />
		  <Route path="success" component={Success} onEnter={onSuccessEnter} onLeave={onSuccessLeave} />
		</Route>
		<Route path="/admin" component={AdminContainer} onEnter={onAdminEnter}>
			<Route path="travelers" component={AllTravelers} onEnter={onTravelersListEnter} />
			<Route path="travelers/:id" component={SingleTraveler} onEnter={onSingleTravelerEnter} />
			<Route path="createuser" component={AdminSignUp} />
		</Route>
    <Route path="/login" component={Login} />
	</div>
);

export default getRoutes;

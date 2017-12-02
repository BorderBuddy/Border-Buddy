import React from 'react';
import { Route, IndexRedirect } from 'react-router';

// Components
import Homepage from './containers/Homepage';
import AdminContainer from './containers/AdminContainer';
import AllTravelers from './containers/AllTravelers';
import SingleTravelerContainer from './containers/SingleTravelerContainer';
import Login from './containers/Login';
import AdminSignUp from './containers/AdminSignUpContainer';
import UpdateUserContainer from './containers/UpdateUserContainer';
import Success from './containers/Success';
import ConnectedSignUpContainer from './connectedComponents/ConnectedSignUpContainer';
import AddTravelerContainer from './containers/AddTravelerContainer';

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
			<Route path="register" component={ConnectedSignUpContainer} />
			<Route path="about" component={About} />
		  <Route path="success" component={Success} onEnter={onSuccessEnter} onLeave={onSuccessLeave} />
		</Route>
		<Route path="/admin" component={AdminContainer} onEnter={onAdminEnter}>
			<IndexRedirect to="/admin/travelers" />
			<Route path="travelers" component={AllTravelers} onEnter={onTravelersListEnter} />
			<Route path="travelers/add" component={AddTravelerContainer} />
			<Route path="travelers/:id" component={SingleTravelerContainer} onEnter={onSingleTravelerEnter} />
			<Route path="createuser" component={AdminSignUp} />
			<Route path="updateprofile" component={UpdateUserContainer} />
		</Route>
    <Route path="/login" component={Login} />
	</div>
);

export default getRoutes;

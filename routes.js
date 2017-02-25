import React from 'react';
import { Route } from 'react-router-dom';

import Home from './components/home/home';
import AdminContainer from './containers/AdminContainer';

const routes = [
  <Route path="/" component={Home} />,
  <Route path="/admin" component={AdminContainer} />
];

export default routes;

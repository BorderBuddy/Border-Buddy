import React from 'react';
import { Route } from 'react-router-dom';

import Home from './components/home/home';

const routes = [
  <Route path="/" component={Home} />,
];

export default routes;

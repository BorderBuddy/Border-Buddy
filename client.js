import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import 'isomorphic-fetch';

import routes from './routes';
import App from './components/app';
import createStore from './redux/create';

import './stylesheets/main.less';

const APP = (
  <Provider store={createStore()}>
    <BrowserRouter>
      <App>
        {routes}
      </App>
    </BrowserRouter>
  </Provider>
);

/* eslint-disable*/
ReactDOM.render(APP, document.getElementById('fund'));
/* eslint-enable */

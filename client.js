import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import 'isomorphic-fetch';

import routes from './routes';
import App from './components/app';
import createStore from './redux/create';

import './stylesheets/main.scss';

// needed for Material-UI and onTouchTap events
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const APP = (
  <Provider store={createStore()}>
  	<MuiThemeProvider>
	    <BrowserRouter>
	      <App>
	        {routes}
	      </App>
	    </BrowserRouter>
    </MuiThemeProvider>
  </Provider>
);

ReactDOM.render(APP, document.getElementById('fund'));

import React from "react";
import { Provider } from "react-redux";
import { Router } from "react-router";
import getRoutes from "../routes";

// needed for Material-UI and onTouchTap events
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const Root = ({ store, history }) => (
  <Provider store={store}>
  	<MuiThemeProvider>
	    <Router history={history}>
	      {getRoutes(store)}
	    </Router>
    </MuiThemeProvider>
  </Provider>
);

export default Root;

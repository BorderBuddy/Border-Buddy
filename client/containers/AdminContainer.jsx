import React, { Component } from 'react';
import { browserHistory, Link } from 'react-router';
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import ActionFlightTakeoff from 'material-ui/svg-icons/action/flight-takeoff';
import AppBarMenu from './AppBarMenu';
import RaisedButton from 'material-ui/RaisedButton';
let style = {
  button: {
    "margin": "2em auto",
    "display": "block",
    "width": "50%"
  }
};

export default class AdminContainer extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <Toolbar style={{ backgroundColor: '#2d6ea8' }}>
          <ToolbarGroup firstChild={true}>
            <IconButton id="btn-all-travelers" onClick={() => browserHistory.push('/admin/travelers')}>
              <img src="/images/logos-png/BB_Logo_03-White.png" />
            </IconButton>
          </ToolbarGroup>
          <ToolbarGroup lastChild={true}>
            <Link to="/admin/travelers/add" >
              <RaisedButton label="Add Traveler" backgroundColor="#FFFFFF" id="add-new-traveler"/>
            </Link>
            <AppBarMenu />
          </ToolbarGroup>
        </Toolbar>
        {this.props.children}
      </div>
    )
  }
}

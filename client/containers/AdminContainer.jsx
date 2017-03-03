import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import ActionFlightTakeoff from 'material-ui/svg-icons/action/flight-takeoff';
import AppBarMenu from './AppBarMenu';


export default class AdminContainer extends Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div>
        <AppBar
          title="Border Buddy"
          iconElementLeft={<IconButton><ActionFlightTakeoff /></IconButton>}
          iconElementRight={<AppBarMenu />}
        />
        {this.props.children}
      </div>
    )
  }
}
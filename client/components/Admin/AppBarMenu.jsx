import React from 'react';
import { browserHistory } from 'react-router';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

export default ({ onCreateUserClick, onSignoutClick }) => (
  <IconMenu
    iconButtonElement={
      <IconButton><MoreVertIcon color={'white'}/></IconButton>
    }
    targetOrigin={{horizontal: 'right', vertical: 'top'}}
    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
  >
    <MenuItem primaryText="All Travelers" onClick={() => browserHistory.push('/admin/travelers')} />
    <MenuItem primaryText="Create New User" onClick={() => browserHistory.push('/admin/createuser')}/>
    <MenuItem primaryText="Settings" />
    <MenuItem primaryText="Sign out" onClick={onSignoutClick}/>
  </IconMenu>
)
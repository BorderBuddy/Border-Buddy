import React from 'react';
import { browserHistory } from 'react-router';
import {IconMenu, IconButton, MenuItem} from '@material-ui/core';
import {MoreVert} from '@material-ui/icon';

export default ({ onCreateUserClick, onSignoutClick }) => (
  <IconMenu
    iconButtonElement={
      <IconButton><MoreVert color={'white'}/></IconButton>
    }
    targetOrigin={{horizontal: 'right', vertical: 'top'}}
    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
  >
    <MenuItem primaryText="All Travelers" onClick={() => browserHistory.push('/admin/travelers')} />
    <MenuItem primaryText="Create New User" onClick={() => browserHistory.push('/admin/createuser')}/>
    <MenuItem primaryText="Update Profile" onClick={() => browserHistory.push('/admin/updateprofile')} />
    <MenuItem primaryText="Sign out" onClick={onSignoutClick}/>
  </IconMenu>
)

import React from 'react';
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
    <MenuItem primaryText="Create New User" onClick={onCreateUserClick}/>
    <MenuItem primaryText="Settings" />
    <MenuItem primaryText="Sign out" onClick={onSignoutClick}/>
  </IconMenu>
)
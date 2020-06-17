import React from 'react';
import { useHistory as history } from 'react-router';
import {IconMenu, IconButton, MenuItem} from '@material-ui/core';
import {MoreVert} from '@material-ui/icons';

export const AppBar = ({onSignoutClick}) => {
  return (
    <IconMenu
      iconButtonElement={
        <IconButton>
            <MoreVert color={'white'}/>
          </IconButton>
      }
      targetOrigin={{horizontal: 'right', vertical: 'top'}}
      anchorOrigin={{horizontal: 'right', vertical: 'top'}}
    >
      <MenuItem primaryText="All Travelers" onClick={() => history.push('/admin/travelers')} />
      <MenuItem primaryText="Create New User" onClick={() => history.push('/admin/createuser')}/>
      <MenuItem primaryText="Update Profile" onClick={() => history.push('/admin/updateprofile')} />
      <MenuItem primaryText="Sign out" onClick={onSignoutClick}/>
    </IconMenu>
  )
}
import React, { Fragment, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Menu, IconButton, MenuItem } from '@material-ui/core'
import { MoreVert } from '@material-ui/icons'

const style = {
  icon: {
    color: 'white',
  },
}

export const RenderAppBar = ({onSignoutClick}: {onSignoutClick: () => void}) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const history = useHistory()
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = (url: string) => {
    setAnchorEl(null)
    if (url === 'onSignoutClick') {
      onSignoutClick()
    } else if (url !== null || url !== undefined) {
      history.push(url)
    }
  }

  return (
    <Fragment>
      <IconButton
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVert style={style.icon} />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose} >
        <MenuItem onClick={() => handleClose('/travelers')}>
          All Travelers
        </MenuItem>
        <MenuItem onClick={() => handleClose('/createuser')}>
          Create New User
        </MenuItem>
        <MenuItem onClick={() => handleClose('/updateprofile')}>
          Update Profile
        </MenuItem>
        <MenuItem onClick={() => handleClose('onSignoutClick')}>
          Sign out
        </MenuItem>
      </Menu>
    </Fragment>
  )
}

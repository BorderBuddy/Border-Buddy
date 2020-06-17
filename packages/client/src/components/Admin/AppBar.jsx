import React, { Fragment } from "react"
import { useHistory as history } from "react-router"
import { Menu, IconButton, MenuItem } from "@material-ui/core"
import { MoreVert } from "@material-ui/icons"

const style = {
  icon: {
    color: "white",
  },
}

export default function RenderAppBar({ onSignoutClick }) {
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = (url) => {
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
        <MenuItem onClick={() => handleClose("/admin/travelers")}>
          All Travelers
        </MenuItem>
        <MenuItem onClick={() => handleClose("/admin/createuser")}>
          Create New User
        </MenuItem>
        <MenuItem onClick={() => handleClose("/admin/updateprofile")}>
          Update Profile
        </MenuItem>
        <MenuItem onClick={() => handleClose("onSignoutClick")}>
          Sign out
        </MenuItem>
      </Menu>
    </Fragment>
  )
}

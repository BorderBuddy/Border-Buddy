import React, { Component } from 'react'
import { useHistory as history, Link } from 'react-router-dom'
import { Toolbar, ToolbarGroup, ToolbarTitle, IconButton, Button } from '@material-ui/core'
import {ActionFlightTakeoff} from '@material-ui/icon'
import AppBarMenu from './AppBarMenu'

const style = {
  button: {
    margin: '2em auto',
    display: 'block',
    width: '50%'
  }
}

export default class AdminContainer extends Component {
  render () {
    return (
      <div>
        <Toolbar style={{ backgroundColor: '#2d6ea8' }}>
          <IconButton
            style={style}
            id="btn-all-travelers"
            onClick={() => history.push('/admin/travelers')}>
            <img src="/images/logos-png/BB_Logo_03-White.png" />
          </IconButton>
          <Button
            style={style}
            id="add-new-traveler"
            onClick={() => history.push('/admin/travelers/add')}>
              Add Traveler
          </Button>
          <AppBarMenu/>
        </Toolbar>
        {/* {this.props.children} */}
      </div>
    )
  }
}

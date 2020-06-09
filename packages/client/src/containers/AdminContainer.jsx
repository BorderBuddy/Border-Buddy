import React, { Component } from 'react'
import { browserHistory, Link } from 'react-router-dom'
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
          <ToolbarGroup firstChild={true}>
            <IconButton id="btn-all-travelers" onClick={() => browserHistory.push('/admin/travelers')}>
              <img src="/images/logos-png/BB_Logo_03-White.png" />
            </IconButton>
          </ToolbarGroup>
          <ToolbarGroup lastChild={true}>
            <Link to="/admin/travelers/add" >
              <Button label="Add Traveler" backgroundColor="#FFFFFF" id="add-new-traveler" variant='contained'/>
            </Link>
            <AppBarMenu />
          </ToolbarGroup>
        </Toolbar>
        {this.props.children}
      </div>
    )
  }
}

import React, { Component, Fragment } from 'react'
import { useHistory as history, Link } from 'react-router-dom'
import { Toolbar, Container, IconButton, Button , AppBar} from '@material-ui/core'
import RenderAppBarMenu from './AppBarMenu'

const style = {
  button: {
    margin: '2em auto',
    display: 'block',
    width: '50%',
    color: 'white'
  },
  icon: {
    maxHeight: '1.5em'
  },
  container:{
    marginTop:'200px'
  }
}

export default class AdminContainer extends Component {
  render () {
    return (
      <Fragment>
        <AppBar>
          <Toolbar style={{ backgroundColor: '#2d6ea8' }}>
            <IconButton
              id="btn-all-travelers"
              onClick={() => history.push('/admin/travelers')}>
              <img src="/images/logos-png/BB_Logo_03-White.png" style={style.icon}/>
            </IconButton>
            <Button
              style={style.button}
              id="add-new-traveler"
              varitant='text'
              onClick={() => history.push('/admin/travelers/add')}>
                Add Traveler
            </Button>
            <RenderAppBarMenu/>
          </Toolbar>
        </AppBar>
        <Container style={style.container}>
          {this.props.children}
        </Container>
      </Fragment>
    )
  }
}

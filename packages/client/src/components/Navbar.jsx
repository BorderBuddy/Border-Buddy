import React from 'react'
import { Button, Grid } from '@material-ui/core'
import { Link } from 'react-router-dom'

const style = {
  color: 'white',
  backgroundColor: '#2d6ea8',
}

export const Navbar = () => (
  <Grid container direction='row' >
    <Button
      className={'col-4'}
      component={Link}
      to={'/why'}
      variant="text"
      style={style}
    >
      Why Border Buddy?
    </Button>
    <Button
      className={'col-4'}
      component={Link}
      to={'/register'}
      variant="text"
      style={style}
    >
      Register
    </Button>
    <Button
      className={'col-4'}
      component={Link}
      to={'/about'}
      variant="text"
      style={style}
    >
      About Us
    </Button>
  </Grid>
)

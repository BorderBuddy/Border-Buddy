import React from 'react'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'

const style = {
  width: '100%',
  color: 'white'
}

export const Navbar = () => (
  <div className="navbar col-12">
    <div className="inline-block col-4">
      <Button
        component={Link}
        to={'/why'}
        variant='text'
        disableElevation
        style={style}>
          Why Border Buddy?
      </Button>
    </div>
    <div className="inline-block col-4">
      <Button component={Link} to={'/register'} variant='text' disableElevation style={style}>Register</Button>
    </div>
    <div className="inline-block col-4">
      <Button component={Link} to={'/about'} variant='text' disableElevation style={style}>About Us</Button>
    </div>
  </div>
)

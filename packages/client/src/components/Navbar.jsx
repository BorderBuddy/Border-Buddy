import React from 'react'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'

const style = {
  width: '100%'
}

export const Navbar = () => (
  <div className="navbar col-12">
    <div className="inline-block col-4">
      <Link to="/why">
        <Button variant="contained" label="Why Border Buddy?" style={style} />
      </Link>
    </div>
    <div className="inline-block col-4">
      <Link to="/register" className={'register-link'}>
        <Button variant="contained" label="Register" style={style} />
      </Link>
    </div>
    <div className="inline-block col-4">
      <Link to="/about">
        <Button variant="contained" label="About Us" style={style} />
      </Link>
    </div>
  </div>
)

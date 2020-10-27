import React from 'react'
import { Grid } from '@material-ui/core'
import { useLocation } from 'react-router-dom'

export const Success = () => {
  const { state } = useLocation()
  return (
    <Grid container direction='row' justify='space-around' align='center' id="success-container">
      <Grid item xs={12} justify='space-around'>
        <h2 className="center">Success!</h2>
      </Grid>
      <Grid item xs={10}>
        <Grid direction='row' container justify='space-around'>
          <Grid container direction='row' justify='space-around'>
            <h3 className="center">
              {`Hello, ${state.res.name}!`}
            </h3>
          </Grid>
          <Grid container direction='row' justify='space-around'>
            <h4 className="center">
              We have created a secure record of your travel information.
            </h4>
          </Grid>
          <Grid container direction='row' justify='space-around'>
            <h4 className="center">
              {`Two hours after you land, we will send a text to +${state.res.countryCode}${state.res.phone}`}
            </h4>
          </Grid>
          <Grid container direction='row' justify='space-around'>
            <h4 className="center">
              If you do not respond 'ok', we will send a lawyer to the airport.
            </h4>
          </Grid>
          <Grid container direction='row' justify='space-around'>
            <h4 className="center">
              Follow the link below for FAQ about your rights when entering the US.
            </h4>
          </Grid>
        </Grid>
      </Grid>
      <Grid container direction='row' justify='space-around'>
        <a
          className="center link-external"
          href="http://www.cunyclear.org/kyr/"
          target="_blank"
          rel="noopener noreferrer"
        >
        Know Your Rights
        </a>
      </Grid>
      <h4 className="center">Safe travels, and thanks for using BorderBuddy!</h4>
    </Grid>
  )
}

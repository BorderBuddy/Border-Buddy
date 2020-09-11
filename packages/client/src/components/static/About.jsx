import React from 'react'
import { Grid } from '@material-ui/core'

export const About = () => (
  <Grid container direction='row' justify='space-around'>
    <Grid xs={12} justify='space-around'>
      <h2 className="mx-auto h1 center subtitle">About Us</h2>
    </Grid>
    <Grid xs={10} justify='space-around'>
      <p className="center">We started at Hack the Ban.</p>
      <Grid container direction='row' justify='space-around'>
        <Grid item xs={12} md={5} justify='space-around'>
          <a href="http://www.vocativ.com/405756/coders-hack-trump-immigration-ban/" target="_blank" rel="noopener noreferrer" >
            <img src="images/hacktheban.png" style={{maxHeight: '100%', maxWidth: '100%'}}/>
          </a>
        </Grid>
      </Grid>
      <p className="center">Now we're getting ready to test our app with real users.</p>
      <p className="center">Our partner organizations, MPower Change and CUNY-CLEAR, provide the legal advocacy and community outreach services that really make our platform come to life. You can learn more about them via the links below.</p>

      <Grid container direction='row' justify='space-around'>
        <Grid item xs={4}>
          <a href="http://www.cunyclear.org/" target="_blank" rel="noopener noreferrer">
            <img src="images/CLEAR.png" style={{maxHeight: '100%', maxWidth: '100%'}}/>
          </a>
        </Grid>

        <Grid item xs={4}>
          <a href="https://mpowerchange.org/" target="_blank" rel="noopener noreferrer">
            <img src="images/mpower.png" style={{maxHeight: '100%', maxWidth: '100%'}} />
          </a>
        </Grid>
      </Grid>

      <Grid direction='row' container justify="space-around">
        <Grid item xs={12}>
          <p className="center">If you'd like to contribute to our project, please check out our Github.</p>
        </Grid>
        <Grid item xs={12} md={5}>
          <a href="https://github.com/EmilyDev/Border-Buddy" target="_blank" rel="noopener noreferrer">
            <img className="github-link" src="images/github.png" style={{maxHeight: '100%', maxWidth: '100%'}} />
          </a>
        </Grid>
      </Grid>
    </Grid>
  </Grid>
)

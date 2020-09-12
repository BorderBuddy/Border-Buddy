import React from 'react'
import { Grid } from '@material-ui/core'

export const WhyBorderBuddy = () => (
  <Grid container direction='row' justify='space-around'>
    <Grid item xs={12} md={10}>
      <Grid item xs={12}>
        <h2 className="mx-auto h1 center subtitle">The Problem</h2>
        <p className="center">Under the Trump administration, more and more travelers face undue scrutiny when entering the United States. If you get detained at the border, it's too late to arrange for a lawyer to come represent you.</p>
        <p className="center">There are legal advocacy groups that provide free services to communities targeted by Trump's immigration policies. But they need to know of your arrival in advance. That's where we come in.</p>
      </Grid>

      <Grid item xs={12}>
        <h2 className="mx-auto h1 center subtitle">How It Works</h2>
        <p className="center">After you register, we keep track of your flight's arrival information. If you make it through customs and immigration without any delays, send us a text and we'll know that you are OK.</p>
        <p className="center">If your flight has landed more than two hours ago and we still haven't heard from you, one of our partners will send a lawyer to the airport as your personal counsel. <em>It's that simple.</em></p>
      </Grid>

      <Grid item xs={12}>
        <h2 className="mx-auto h1 center subtitle">Ease of Mind</h2>
        <p className="center">BorderBuddy is not a for-profit business. Your travel information is stored on a secure server and shared only with the lawyers who come to fight for your case.</p>
      </Grid>

      <Grid item xs={12}>
        <h2 className="mx-auto h1 center subtitle">I'm Ready!</h2>
        <p className="center">Currently, our service is getting ready for its first round of user testing for travelers arriving in New York City. Stay tuned for updates, and thanks for supporting BorderBuddy.</p>
      </Grid>
    </Grid>
  </Grid>
)

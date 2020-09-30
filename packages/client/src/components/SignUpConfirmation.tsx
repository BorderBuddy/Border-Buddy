import React from 'react'
import { Dialog, Button, DialogActions, Grid } from '@material-ui/core'
import FlightConfirmation from './FlightConfirmation'

export interface SignUpConfirmationProps {
  handleClose: () => void
  confirmSubmit: () => void
  open: boolean
  flight: {}
}

export const SignUpConfirmation = ({ confirmSubmit, handleClose, open, flight }: SignUpConfirmationProps) => (
  <Dialog
    open={open}
    title='Traveler submitted'
  >
    <Grid container>
      {
        flight && Object.keys(flight).length
          ? <FlightConfirmation flight={flight}/>
          : <h4>Sorry, we could not find your flight or it has already landed.</h4>
      }
      <Grid container direction='row'>
        <DialogActions>
          <Button onClick={confirmSubmit} color='primary'>
          Ok
          </Button>
          <Button onClick={handleClose} color='primary'> x </Button>
        </DialogActions>
      </Grid>
    </Grid>
  </Dialog>
)

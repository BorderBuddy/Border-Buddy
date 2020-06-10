import React from 'react'
import { Dialog, Button, DialogActions } from '@material-ui/core'
import FlightConfirmation from './FlightConfirmation'

export interface SignUpConfirmationProps {
  confirmSubmit: () => void
  open: boolean
  flight: {}
}

export const SignUpConfirmation = ({ confirmSubmit, open, flight }: SignUpConfirmationProps) => {
  return (
    <div>
      <Dialog
        open={open}
        title={'Traveler submitted'}>
        {
          flight && Object.keys(flight).length
            ? <FlightConfirmation flight={flight}/>
            : <h4>Sorry, we could not find your flight or it has already landed.</h4>
        }
        <DialogActions>
          <Button onClick={confirmSubmit} color='primary'>
          Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

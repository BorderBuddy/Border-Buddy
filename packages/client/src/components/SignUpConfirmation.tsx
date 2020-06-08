import React from 'react'
import { Dialog, FlatButton } from 'material-ui'
import FlightConfirmation from './FlightConfirmation'

interface SignUpConfProps {
  confirmSubmit: any,
  open: any,
  flight: any,
}

export const SignUpConfirmation = ({ confirmSubmit, open, flight }: SignUpConfProps) => {
  const actions = [
    <FlatButton
      key={1}
      label="OK"
      primary={true}
      onTouchStart={confirmSubmit}
    />
  ]

  return (
    <div>
      <Dialog
        open={open}
        actions={actions}
        modal={true}
        title={'Traveler submitted'}>
        {
          flight && Object.keys(flight).length
            ? <FlightConfirmation flight={flight}/>
            : <h4>Sorry, we could not find your flight or it has already landed.</h4>
        }
      </Dialog>
    </div>
  )
}

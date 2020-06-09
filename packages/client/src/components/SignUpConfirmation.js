import React from 'react'
import { Dialog, Button } from '@material-ui/core'
import FlightConfirmation from './FlightConfirmation'

export default ({ confirmSubmit, open, flight }) => {
  const actions = [
    <Button
      key={1}
      label="OK"
      color='primary'
      onClick={confirmSubmit}
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

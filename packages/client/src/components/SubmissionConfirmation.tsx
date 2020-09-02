import React, { Fragment } from 'react'
import { Dialog, Button, DialogActions } from '@material-ui/core'
import FlightConfirmation from './FlightConfirmation'
import { useFormikContext } from 'formik'

export const SubmissionConfirmation = (props : any) => {
  const { values } = useFormikContext()
  // console.log(`values in confirmation: ${JSON.stringify(values)}`)
  const {
    flight,
    open,
    handleClose,
    confirmSubmit,
  } = props

  return (
    <Dialog
      title="Confirm Submission"
      open={open}
    >
      <DialogActions>
        {flight
          ? <Fragment>
            <Button
              variant='text'
              color='primary'
              onClick={() => handleClose()}
            >Cancel</Button>
            <Button
              id="submit-flight-confirmation"
              variant='contained'
              color='primary'
              onClick={() => confirmSubmit(values)}
            >Submit</Button>
          </Fragment>
          : <Button
            variant='contained'
            color='primary'
            onClick={() => handleClose()}
          >OK</Button>
        }
      </DialogActions>
      <FlightConfirmation flight={flight} />
    </Dialog>
  )
}

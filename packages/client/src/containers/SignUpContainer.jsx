import React, { Component, Fragment, useState } from 'react'
import { connect } from 'react-redux'
import { Dialog, Button, DialogActions } from '@material-ui/core'
// import Form from '../components/FormContainer'
import { RegisterForm } from '../components/RegisterForm'
import FlightConfirmation from '../components/FlightConfirmation'
import { signUpTraveler } from '../actions/signUp'
import { checkFlight } from '../actions/flight'
import { useFormikContext, Formik, Form, Field } from 'formik'

const SignUpContainer = (props) => {
  console.log(`props to SignUpContainer: ${JSON.stringify(props)}`)

  const [state, setState] = useState({
    open: false
  })

  const handleClose = () => {
    setState({ open: false })
  }

  const confirmSubmit = () => {
    const { values } = useFormikContext()
    const { signUpTraveler, flight } = props
    console.log(values)
    // const { values } = props.form.travelerForm
    // values.countryCode = values.countryCode.split('-')[1].slice(2)
    const travelerInfo = Object.assign({}, values, { scheduledArrivalTime: flight.arrivalTimeUtc })
    signUpTraveler(travelerInfo)
    handleClose()
  }

  const handleSubmit = (formValues) => {
    const { flightNum, airlineCode, scheduledArrivalTime } = formValues
    const day = scheduledArrivalTime.getDate()
    const year = scheduledArrivalTime.getYear() + 1900
    const month = scheduledArrivalTime.getMonth() + 1
    props.checkFlight(airlineCode, flightNum, year, month, day)
      .then(() => {
        setState({ open: true })
      })
      .catch(() => {
        setState({ open: false })
      })
  }

  return (
    <div>
      <RegisterForm handleSubmit={handleSubmit} isAdmin={false} extraFields={[]} formTitle="Traveler Registration" />
      <Dialog
        title="Confirm Submission"
        modal={true}
        open={state.open}
      >
        <DialogActions>
          {props.flight
            ? <Fragment>
              <Button
                variant='contained'
                color='primary'
                onClick={handleClose}
              >Cancel</Button>
              <Button
                id="submit-flight-confirmation"
                variant='text'
                color='primary'
                onClick={confirmSubmit}
              >Submit</Button>
            </Fragment>
            : <Button
              variant='contained'
              color='primary'
              onClick={handleClose}
            >OK</Button>
          }
        </DialogActions>
        <FlightConfirmation flight={props.flight} />
      </Dialog>
    </div>
  )
}

/* ---------------------------REDUX CONTAINER--------------------------- */

const mapStateToProps = ({ form, flight }) => ({ form, flight })

const mapDispatchToProps = dispatch => ({
  signUpTraveler: res => dispatch(signUpTraveler(res)),
  checkFlight: (code, flightNum, year, month, day) => dispatch(checkFlight(code, flightNum, year, month, day))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpContainer)

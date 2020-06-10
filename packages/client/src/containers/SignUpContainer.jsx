import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { Dialog, Button } from '@material-ui/Core'
import Form from '../components/FormContainer'
import FlightConfirmation from '../components/FlightConfirmation'
import { signUpTraveler } from '../actions/signUp'
import { checkFlight } from '../actions/flight'

class SignUpContainer extends Component {
  constructor () {
    super()
    this.state = {
      open: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.confirmSubmit = this.confirmSubmit.bind(this)
  }

  handleClose () {
    this.setState({ open: false })
  }

  confirmSubmit () {
    const { signUpTraveler, flight } = this.props
    const { values } = this.props.form.travelerForm
    values.countryCode = values.countryCode.split('-')[1].slice(2)
    const travelerInfo = Object.assign({}, values, { arrivalTime: flight.arrivalTimeUtc })
    signUpTraveler(travelerInfo)
    this.handleClose()
  }

  handleSubmit (e) {
    e.preventDefault()
    const { flightNum, airlineCode, arrivalTime } = this.props.form.travelerForm.values
    const day = arrivalTime.getDate()
    const year = arrivalTime.getYear() + 1900
    const month = arrivalTime.getMonth() + 1
    this.props.checkFlight(airlineCode, flightNum, year, month, day)
      .then(() => {
        this.setState({ open: true })
      })
      .catch(() => {
        this.setState({ open: false })
      })
  }

  render () {
    const confirmActions = [
      <Button
        label="Cancel"
        variant='contained'
        color='primary'
        onClick={this.handleClose}
      />,
      <Button
        id="submit-flight-confirmation"
        label="Submit"
        variant='text'
        color='primary'
        onClick={this.confirmSubmit}
      />
    ]

    const cancelActions = [
      <Button
        label="OK"
        variant='contained'
        color='primary'
        onClick={this.handleClose}
      />
    ]

    return (
      <div>
        <Form handleSubmit={this.handleSubmit} extraFields={[]} formTitle="Traveler Registration" />
        <Dialog
          title="Confirm Submission"
          actions={(this.props.flight) ? confirmActions : cancelActions}
          modal={true}
          open={this.state.open}
        >
          <FlightConfirmation flight={this.props.flight} />
        </Dialog>
      </div>
    )
  }
}

/* ---------------------------REDUX CONTAINER--------------------------- */

const mapStateToProps = ({ form, flight }) => ({ form, flight })

const mapDispatchToProps = dispatch => ({
  signUpTraveler: traveler => dispatch(signUpTraveler(traveler)),
  checkFlight: (code, flightNum, year, month, day) => dispatch(checkFlight(code, flightNum, year, month, day))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpContainer)

import React from 'react';
import { connect } from 'react-redux';
import AdminAddTravelerForm from '../components/Admin/AdminAddTravelerForm';
import {checkFlight} from "../actions/flight";
import {signUpTraveler} from "../actions/signUp";

export class AddTravelerContainer extends React.Component {
  constructor() {
    super();

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault();

    const formValues = this.props.form.travelerForm.values;

    if (flightInfoSubmitted(formValues)) {
      const { flightNum, airlineCode, arrivalTime } = formValues;
      const day = arrivalTime.getDate();
      const year = arrivalTime.getYear() + 1900;
      const month = arrivalTime.getMonth() + 1;
      this.props.checkFlight(airlineCode, flightNum, year, month, day)
      .then((res) => {
        formValues.countryCode = formValues.countryCode.split('-')[1].slice(2);
        this.props.createTraveler(formValues, true);
      })
      .catch((err) => {
        
      })
    } else {
      formValues.countryCode = formValues.countryCode.split('-')[1].slice(2);
      this.props.createTraveler(formValues, true);
    }
  }

  render() {
    return (
      <AdminAddTravelerForm 
      handleSubmit={this.handleSubmit}
      representatives={this.props.users}
      title="Add New Traveler and Trip"
      />
    )
  }
}

// HELPER FN
const flightInfoSubmitted = (formValues) => {
  return formValues.flightNum && formValues.airlineCode && formValues.arrivalTime;
};

const mapStateToProps = ({form, users}) => ({form, users})
const mapDispatchToProps = dispatch => ({
  createTraveler: (traveler, isAdmin) => dispatch(signUpTraveler(traveler, isAdmin)),
  checkFlight: (code, flightNum, year, month, day) => dispatch(checkFlight(code, flightNum, year, month, day))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddTravelerContainer);

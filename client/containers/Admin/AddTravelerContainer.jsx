import React from 'react';
import { connect } from 'react-redux';
import AddTraveler from '../../components/Admin/AddTraveler';
import {checkFlight} from "../../actions/flight";
import {signUpTraveler} from "../../actions/signUp";

export class AddTravelerContainer extends React.Component {
  constructor() {
    super();

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault();

    const formValues = this.props.form.addTraveler.values;

    if(flightInfoSubmitted(formValues)) {
      const { flightNum, airlineCode, arrivalTime } = formValues;
      const day = arrivalTime.getDate();
      const year = arrivalTime.getYear() + 1900;
      const month = arrivalTime.getMonth() + 1;
      this.props.checkFlight(airlineCode, flightNum, year, month, day);
    }

    this.props.createTraveler(formValues);
  }

  render() {
    return(
      <AddTraveler handleSubmit={this.handleSubmit}/>
    )
  }
}

// HELPER FN
const flightInfoSubmitted = (formValues) => {
  return formValues.flightNum && formValues.airlineCode && formValues.arrivalTime;
};

const mapStateToProps = ({form}) => ({form})
const mapDispatchToProps = dispatch => ({
  createTraveler: traveler => dispatch(signUpTraveler(traveler)),
  checkFlight: (code, flightNum, year, month, day) => dispatch(checkFlight(code, flightNum, year, month, day))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddTravelerContainer);

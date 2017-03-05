import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dialog, FlatButton, RaisedButton } from 'material-ui';
import SignUp from '../components/SignUp';
import FlightConfirmation from '../components/FlightConfirmation';
import { signUpTraveler } from '../actions/signUp';


class SignUpContainer extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
      flight: null
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.checkFlight = this.checkFlight.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.confirmSubmit = this.confirmSubmit.bind(this);
  }

  handleClose() {
    this.setState({open: false});
  }

  confirmSubmit() {
    const { createTraveler } = this.props;
    const { values } = this.props.form.signUp;
    createTraveler(values);
    this.handleClose();
  }

  handleSubmit(e) {
    e.preventDefault();
    const { flightNum, airlineCode, arrivalTime } = this.props.form.signUp.values;
    const day = arrivalTime.getDate();
    const year = arrivalTime.getYear() + 1900;
    const month = arrivalTime.getMonth() + 1;
    this.checkFlight(airlineCode, flightNum, year, month, day);
  }

  checkFlight(code, flightNum, year, month, day) {
    axios.get(`/api/flight/verify?code=${code}&flightNum=${flightNum}&year=${year}&month=${month}&day=${day}`)
    .then(response => {
      this.setState({ flight: response.data, open: true});
    })
    .catch((e) => {
      this.setState({ flight: null, open: true });
    });
  }

  render() {
    const confirmActions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <RaisedButton
        label="Submit"
        primary={true}
        onTouchTap={this.confirmSubmit}
      />
    ];

    const cancelActions = [
      <FlatButton
        label="OK"
        primary={true}
        onTouchTap={this.handleClose}
      />
    ];

    return (
      <div id="signup-container">
        <SignUp handleSubmit={this.handleSubmit} handleFlightChange={this.handleFlightChange} />
        <Dialog
          title={(this.state.flight) ? 'Please confirm your flight info' : 'Whoops!'}
          actions={(this.state.flight) ? confirmActions : cancelActions}
          modal={true}
          open={this.state.open}
        >
          {
            this.state.flight ?
            <FlightConfirmation flight={this.state.flight} />
            :
            <h4>Sorry, we could not find your flight</h4>
          }
        </Dialog>
      </div>
    );
  }
}

/*---------------------------REDUX CONTAINER---------------------------*/

const mapStateToProps = ({form}) => ({form});

const mapDispatchToProps = dispatch => ({
  createTraveler: traveler => dispatch(signUpTraveler(traveler))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpContainer);

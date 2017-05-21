import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dialog, FlatButton, RaisedButton } from 'material-ui';
import SignUp from '../components/SignUp';
import FlightConfirmation from '../components/FlightConfirmation';
import { signUpTraveler } from '../actions/signUp';
import { checkFlight } from '../actions/flight';


class SignUpContainer extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.confirmSubmit = this.confirmSubmit.bind(this);
  }

  handleClose() {
    this.setState({open: false});
  }

  confirmSubmit() {
    const { createTraveler } = this.props;
    const { values } = this.props.form.signUp;
    // TODO: add time details here
    createTraveler(values);
    this.handleClose();
  }

  handleSubmit(e) {
    e.preventDefault();
    const { flightNum, airlineCode, arrivalTime } = this.props.form.signUp.values;
    const day = arrivalTime.getDate();
    const year = arrivalTime.getYear() + 1900;
    const month = arrivalTime.getMonth() + 1;
    this.props.checkFlight(airlineCode, flightNum, year, month, day)
    .then(() => {
      this.setState({ open: true });
    })
    .catch(() => {
      this.setState({ open: false })
    })
  }

  render() {
    const confirmActions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <RaisedButton
        id="submit-flight-confirmation"
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
          title="Confirm Submission"
          actions={(this.props.flight) ? confirmActions : cancelActions}
          modal={true}
          open={this.state.open}
        >
          {
            this.props.flight ?
            <FlightConfirmation flight={this.props.flight} />
            :
            <h4>Sorry, we could not find your flight</h4>
          }
        </Dialog>
      </div>
    );
  }
}

/*---------------------------REDUX CONTAINER---------------------------*/

const mapStateToProps = ({form, flight}) => ({form, flight});

const mapDispatchToProps = dispatch => ({
  createTraveler: traveler => dispatch(signUpTraveler(traveler)),
  checkFlight: (code, flightNum, year, month, day) => dispatch(checkFlight(code, flightNum, year, month, day))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpContainer);

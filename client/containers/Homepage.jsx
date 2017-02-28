import axios from 'axios';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Dialog, FlatButton, RaisedButton } from 'material-ui';
import SignUp from '../components/SignUp';
import FlightConfirmation from '../components/FlightConfirmation';
import { signUp } from '../actions/signUp';


class Homepage extends Component {
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
    // const { signUp } = this.props;
    const { values } = this.props.form.signUp;
    console.log('values are ', values);
    // signUp(values);
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
    axios.get(`http://localhost:3000/api/flight/verify?code=${code}&flightNum=${flightNum}&year=${year}&month=${month}&day=${day}`)
    .then(response => {
      this.setState({ flight: response.data, open: true});
    })
    .catch(() => {
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
      <div>
        <SignUp handleSubmit={this.handleSubmit} handleFlightChange={this.handleFlightChange} />
        <Dialog
          title="Confirm Submission"
          actions={(this.state.flight) ? confirmActions : cancelActions}
          modal={true}
          open={this.state.open}
        >
          {
            this.state.flight ?
            <FlightConfirmation flight={this.state.flight} />
            :
            <h3>'Sorry, we could not find your flight'</h3>
          }
        </Dialog>
      </div>
    );
  }
}

/*---------------------------REDUX CONTAINER---------------------------*/

const mapStateToProps = ({form}) => ({form});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ signUp }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Homepage);

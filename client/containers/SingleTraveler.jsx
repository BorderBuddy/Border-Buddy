import React, {Component} from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import SingleTraveler from '../components/Admin/SingleTraveler';
import FlightConfirmation from '../components/FlightConfirmation';
import {browserHistory} from 'react-router';
import { updateTraveler, sendText } from '../actions/selectedTraveler';
import { checkFlight } from '../actions/flight';


class SingleTravelerContainer extends Component {
	constructor(props) {
		super(props);

		this.state = {
      changed: false,
      flightConfirmOpen: false,
      sentTextOpen: false,
      textSentSuccess: null
		};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFlightConfirmClose = this.handleFlightConfirmClose.bind(this);
    this.handleSentTextClose = this.handleSentTextClose.bind(this);
    this.confirmSubmit = this.confirmSubmit.bind(this);
    this.sendText = this.sendText.bind(this);
	}

  handleFlightConfirmClose() {
    this.setState({flightConfirmOpen: false });
  }

  handleSentTextClose() {
    this.setState({ sentTextOpen: false });
  }

  confirmSubmit() {
    const { updateTraveler, routeParams } = this.props;
    const { values } = this.props.form.singleTraveler;
    updateTraveler(values, routeParams.id)
    .then(() => {
      this.handleFlightConfirmClose();
      browserHistory.push('/admin/travelers');
    })
  }

  sendText() {
    this.props.sendText(this.props.form.singleTraveler.values)
    .then(() => {
      this.setState({ sentTextOpen: true, textSentSuccess: true })
    })
    .catch(() => {
      this.setState({ sentTextOpen: true, textSentSuccess: false })
    })
  }


  handleSubmit(e) {
    e.preventDefault();
    const { flightNum, airlineCode, arrivalTime } = this.props.form.singleTraveler.values;
    const day = arrivalTime.getDate();
    const year = arrivalTime.getYear() + 1900;
    const month = arrivalTime.getMonth() + 1;
    this.props.checkFlight(airlineCode, flightNum, year, month, day)
    .then(() => {
      this.setState({ flightConfirmOpen: true });
    }) 
    .catch(() => {
      this.setState({ flightConfirmOpen: false });
    })
  }

	render() {
    const confirmActions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleFlightConfirmClose}
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
        onTouchTap={this.handleFlightConfirmClose}
      />
    ];

    const textModalOptions = [
      <FlatButton 
        label="OK"
        primary={true}
        onTouchTap={this.handleSentTextClose}
      />
    ]

		return (
    <div>
      <SingleTraveler 
        handleSubmit={this.handleSubmit} 
        changed={this.state.changed} 
        id={this.props.params.id}
        sendText={this.sendText}
      />
      <Dialog
        title={(this.props.flight) ? 'Please confirm your flight info' : 'Whoops!'}
        actions={(this.props.flight) ? confirmActions : cancelActions}
        modal={true}
        open={this.state.flightConfirmOpen}
      >
        {
          this.props.flight ?
            <FlightConfirmation flight={this.props.flight} />
            :
            <h4>Sorry, we could not find your flight</h4>
        }
      </Dialog>
      <Dialog
        title="Texting Traveler..."
        actions={textModalOptions}
        modal={true}
        open={this.state.sentTextOpen}
      >
        {
          this.state.textSentSuccess ?
            <h4>Your text has been sent successfully.</h4>
            :
            <h4>There was a problem trying to send your text</h4>
        }
      </Dialog>
    </div>
    )
	}
}

/*---------------------------REDUX CONTAINER---------------------------*/

const mapStateToProps = ({ form, flight }) => ({ form, flight })

const mapDispatchToProps = dispatch => ({
  updateTraveler: (traveler, id) => dispatch(updateTraveler(traveler, id)),
  checkFlight: (code, flightNum, year, month, day) => dispatch(checkFlight(code, flightNum, year, month, day)),
  sendText: (traveler) => dispatch(sendText(traveler))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleTravelerContainer);
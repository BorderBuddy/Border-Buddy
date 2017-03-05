import React, {Component} from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import SingleTraveler from '../components/Admin/SingleTraveler';
import FlightConfirmation from '../components/FlightConfirmation';
import {browserHistory} from 'react-router';
import { setSelectedTraveler, updateTraveler } from '../actions/selectedTraveler';
import { setFlight, checkFlight } from '../actions/flight';


class SingleTravelerContainer extends Component {
	constructor(props) {
		super(props);

		this.state = {
      changed: false,
      open: false
		};
    this.updateTraveler = this.updateTraveler.bind(this);
    this.updateFlight = this.updateFlight.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
	}

  confirmSubmit() {
    const { traveler, flight } = this.props;
    
  }

  updateTraveler(key, value) {
    console.log(key, value);
    const newState = {[key]: value};
    const { setSelectedTraveler, selectedTraveler } = this.props;
    setSelectedTraveler(Object.assign({}, selectedTraveler, newState));
    this.setState({ changed: true })
  }

  updateFlight(key, value) {
    const newState = {[key]: value};
    const { setFlight, flight } = this.props;
    setFlight(Object.assign({}, flight, newState));
    this.setState({ changed: true })
  }

  handleSubmit(e) {
    e.preventDefault();
    const { flightNum, airlineCode, arrivalTime } = this.props.form.signUp.values;
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
		const { initialValues } = this.props;
		return (
    <div>
      <SingleTraveler
        updateTraveler={this.updateTraveler} 
        updateFlight={this.updateFlight} 
        handleSubmit={this.handleSubmit}
        changed={this.state.changed} 
        id={this.props.params.id}/>
      
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
    )
	}
}


// const mapStateToProps = ({ selectedTraveler }) => {
//   const { name, nationality, email, phone, connectivity, secondaryContact, status } = selectedTraveler;
//   const { arrivalTime, airlineCode, flightNum } = selectedTraveler.flight;
//   return { 
//     initialValues: {
//       name, nationality, email, phone, connectivity, secondaryContact, status, arrivalTime, airlineCode, flightNum
//     }
//   }
  
// }

const mapDispatchToProps = dispatch => ({
  setSelectedTraveler: (selectedTraveler) => dispatch(setSelectedTraveler(selectedTraveler)),
  setFlight: (flight) => dispatch(setFlight(flight)),
  updateTraveler: (traveler) => dispatch(updateTraveler(traveler)),
  checkFlight: (flight) => dispatch(checkFlight(flight))
})

export default connect(null, mapDispatchToProps)(SingleTravelerContainer);
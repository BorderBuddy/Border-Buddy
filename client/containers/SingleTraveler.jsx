import React, {Component} from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import SingleTraveler from '../components/Admin/SingleTraveler';
import {browserHistory} from 'react-router';
import { setSelectedTraveler, updateTraveler } from '../actions/selectedTraveler';
import { setFlight } from '../actions/flight';


class SingleTravelerContainer extends Component {
	constructor(props) {
		super(props);

    console.log(props);
		this.state = {
      changed: false
		};
    this.updateTraveler = this.updateTraveler.bind(this);
    this.updateFlight = this.updateFlight.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
	}

  updateTraveler(key, value) {
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
    const { updateTraveler, updateFlight, selectedTraveler, flight } = this.props;
    Promise.all([updateTraveler(selectedTraveler), updateFlight(flight)])
    .then(res => {
      console.log(res);
      browserHistory.push('/admin');
    })
    // TODO: axios put to backend
    // const { selectedTraveler, flight } = this.state;
    // const updatingTraveler = axios.put(`http://localhost:3000/api/traveler/${selectedTraveler.id}`, selectedTraveler)
    // const updatingFlight = axios.put(`http://localhost:3000/api/flight/${flight.id}`, flight)
    // Promise.all[updatingTraveler, updatingFlight]
    // .then(res => {
    //   console.log('User Updated!', res)
    //   browserHistory.push('/admin')
    // })
    console.log(this.props);

  }

	render() {
		const { selectedTraveler, flight } = this.props;
		return (
		 <SingleTraveler
      traveler={selectedTraveler} 
      flight={flight} 
      updateTraveler={this.updateTraveler} 
      updateFlight={this.updateFlight} 
      handleSubmit={this.handleSubmit}
      changed={this.state.changed} />
		);
	}
}


const mapStateToProps = ({ selectedTraveler, flight }) => ({
  selectedTraveler,
  flight
})

const mapDispatchToProps = dispatch => ({
  setSelectedTraveler: (selectedTraveler) => dispatch(setSelectedTraveler(selectedTraveler)),
  setFlight: (flight) => dispatch(setFlight(flight)),
  updateTraveler: (traveler) => dispatch(updateTraveler(traveler))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleTravelerContainer);
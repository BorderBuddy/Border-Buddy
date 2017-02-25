import React, {Component} from 'react';
import SingleTraveler from '../components/Admin/SingleTraveler';

const dummyFlight = {
	number: 'UA88',
	date: 'June 11, 2017',
	time: Date.now()
};

const dummyTraveler = { id: 1, phone: '8081980892', name: 'Dirron Pewers', status: 'in transit', connectivity: true, nationality: 'Syria', flight: dummyFlight};


class SingleTravelerContainer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			selectedTraveler: {},
      flight: {},
      changed: false
		};
    this.updateTraveler = this.updateTraveler.bind(this);
    this.updateFlight = this.updateFlight.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		this.setState({ selectedTraveler: dummyTraveler });
    this.setState({ flight: dummyFlight })
		// TODO: fetch single traveler from backend and put on local state
	}

  updateTraveler(key, value) {
    const newState = {[key]: value};
    this.setState({
      selectedTraveler: Object.assign({}, this.state.selectedTraveler, newState),
      changed: true
    });
  }

  updateFlight(key, value) {
    const newState = {[key]: value};
    this.setState({
      flight: Object.assign({}, this.state.flight, newState),
      changed: true
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    // TODO: axios put to backend
    console.log("SAVED DATA!", this.state);
  }

	render() {
		const { selectedTraveler, flight, changed } = this.state;
		return (
		 <SingleTraveler 
      traveler={selectedTraveler} 
      flight={flight} 
      updateTraveler={this.updateTraveler} 
      updateFlight={this.updateFlight} 
      handleSubmit={this.handleSubmit}
      changed={changed} />
		);
	}
}

export default SingleTravelerContainer;

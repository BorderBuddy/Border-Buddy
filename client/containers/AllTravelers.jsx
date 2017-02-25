import React, {Component} from 'react';
import AllTravelers from '../components/Admin/AllTravelers';

const dummyFlight = {
	number: 'UA88',
	date: 'June 11, 2017',
	time: Date.now()
}

const dummyTravelers = [
	{ id: 1, phone: '8081980892', name: 'Dirron Pewers', status: 'in transit', connectivity: true, nationality: 'Syria', flight: dummyFlight},
	{ id: 2, phone: '8081093892', name: 'Gandrew Aionfriddy', status: 'in transit', connectivity: true, nationality: 'Yemen', flight: dummyFlight}
]


class AllTravelersContainer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			travelers: [],
		};
	}

	componentDidMount() {
		this.setState({ travelers: dummyTravelers })
		// TODO: fetch all users from backend and put on local state
	}

	render() {
		const { travelers} = this.state;
		return (
			<AllTravelers travelers={travelers} selectTraveler={this.selectTraveler} />
		);
	}
}

export default AllTravelersContainer;
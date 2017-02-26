import React, {Component} from 'react';
import AllTravelers from '../components/Admin/AllTravelers';

const dummyFlight = {
	number: 'UA88',
	date: 'June 11, 2017',
	time: '11:30pm'
}

export const dummyTravelers = [
	{ id: 1, phone: '8081980892', name: 'Dirron Pewers', status: 'in transit', connectivity: true, nationality: 'Syria', flight: dummyFlight},
	{ id: 2, phone: '8081093892', name: 'Gandrew Aionfriddy', status: 'in transit', connectivity: true, nationality: 'Yemen', flight: dummyFlight},
	{ id: 3, phone: '2097470820', name: 'Emily Whasser', status: 'in transit', connectivity: true, nationality: 'Iran', flight: dummyFlight},
	{ id: 4, phone: '2340973097', name: 'Taf Thaman', status: 'in transit', connectivity: true, nationality: 'Iraq', flight: dummyFlight},
	{ id: 5, phone: '9893389292', name: 'Ian Munrovia', status: 'in transit', connectivity: true, nationality: 'Afghanistan', flight: dummyFlight},
	{ id: 6, phone: '1097497297', name: 'Peeples McPerson', status: 'in transit', connectivity: true, nationality: 'Afghanistan', flight: dummyFlight},
	{ id: 7, phone: '9982784762', name: 'Tatiana Alex', status: 'in transit', connectivity: true, nationality: 'Yemen', flight: dummyFlight},
	{ id: 8, phone: '7903338892', name: 'Wat Uwotmate', status: 'in transit', connectivity: true, nationality: 'Nigeria', flight: dummyFlight},
	{ id: 9, phone: '2928773366', name: 'DT Jacksern', status: 'in transit', connectivity: true, nationality: 'Sudan', flight: dummyFlight},
	{ id: 10, phone: '2027740729', name: 'Fraulein Hhauserr', status: 'in transit', connectivity: true, nationality: 'Sudan', flight: dummyFlight}
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
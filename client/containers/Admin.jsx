import React, {Component} from 'react';
import AllTravelers from '../components/Admin/AllTravelers';
import SingleTraveler from '../components/Admin/SingleTraveler';

const dummyFlight = {
	number: 'UA88',
	date: 'June 11, 2017',
	time: Date.now()
}

const dummyTravelers = [
	{ id: 1, phone: '8081980892', name: 'Dirron Pewers', status: 'in transit', connectivity: true, nationality: 'Syria', flight: dummyFlight},
	{ id: 2, phone: '8081093892', name: 'Gandrew Aionfriddy', status: 'in transit', connectivity: true, nationality: 'Yemen', flight: dummyFlight}
]


class AdminContainer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			travelers: [],
			selectedTraveler: null
		};

		this.selectTraveler = this.selectTraveler.bind(this);
	}

	selectTraveler(index) {
		console.log('ran and index is ', index)
		const selectedTraveler = this.state.travelers[index];
		this.setState({ selectedTraveler })
	}

	componentDidMount() {
		this.setState({ travelers: dummyTravelers })
		// TODO: fetch all users from backend and put on local state
	}

	render() {
		const {selectedTraveler, travelers} = this.state;
		return(
			<div>
				{
					selectedTraveler ?
					<SingleTraveler traveler={selectedTraveler} /> :
					<AllTravelers travelers={travelers} selectTraveler={this.selectTraveler} />
				}
			</div>
		)
	}
}

export default AdminContainer;
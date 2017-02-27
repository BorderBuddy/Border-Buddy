import React, {Component} from 'react';
import AllTravelers from '../components/Admin/AllTravelers';
import axios from 'axios';


class AllTravelersContainer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			travelers: [],
		};
	}

	componentDidMount() {
		axios.get('/api/traveler')
		.then(travelers => this.setState({ travelers: travelers.data }))
		.catch(console.error)
	}

	render() {
		const { travelers} = this.state;
		return (
			<AllTravelers travelers={travelers} selectTraveler={this.selectTraveler} />
		);
	}
}

export default AllTravelersContainer;
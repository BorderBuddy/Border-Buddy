import React, {Component} from 'react';
import { connect } from 'react-redux';
import AllTravelers from '../components/Admin/AllTravelers';
import axios from 'axios';


class AllTravelersContainer extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { travelers } = this.props;
		return (
			<AllTravelers travelers={travelers} selectTraveler={this.selectTraveler} />
		);
	}
}

const mapStateToProps = ({ travelers }) => ({
	travelers
});

export default connect(mapStateToProps)(AllTravelersContainer);
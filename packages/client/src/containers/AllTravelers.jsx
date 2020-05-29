import React, {Component} from 'react';
import { connect } from 'react-redux';
import AllTravelers from '../components/Admin/AllTravelers';
import AllTravelersMobile from '../components/Admin/AllTravelersMobile';
import axios from 'axios';

class AllTravelersContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			view: null,
			width: window.innerWidth
		}
	}

	componentDidMount() {
		window.addEventListener('resize', () => {
			const width = window.innerWidth
			this.setState({ width })
		})
	}
	
	mobileOrDesktop(travelers) {
		if(this.state.width > 1100) {
			return (
				<AllTravelers travelers={travelers} />
			)
		} else {
				return (
					<AllTravelersMobile travelers={travelers} />
				)
		}
	}

	render() {
		const { travelers } = this.props;
		return (
			<div>
				{this.mobileOrDesktop(travelers)}
			</div>
		);
	}
}

const mapStateToProps = ({ travelers }) => ({
	travelers
});

export default connect(mapStateToProps)(AllTravelersContainer);
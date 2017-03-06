import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router';

const style = {
	width: '100%'
};

export default () => (
	<div className="navbar col-12">
		<div className="inline-block col-4">
			<Link to="/why">
				<FlatButton secondary={true} style={style}>Why Border Buddy?</FlatButton>
			</Link>
		</div>
		<div className="inline-block col-4">
			<Link to="/register">
				<FlatButton secondary={true} style={style}>Register</FlatButton>
			</Link>
		</div>
		<div className="inline-block col-4">
			<Link to="/about">
				<FlatButton secondary={true} style={style}>About Us</FlatButton>
			</Link>
		</div>
	</div>
);

import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router';

const style = {
	width: '100%',

};

export default () => (
	<div className="navbar col-12">
		<div className="inline-block col-4">
			<Link to="/why">
				<RaisedButton primary={true} label="Why Border Buddy?" style={style} />
			</Link>
		</div>
		<div className="inline-block col-4">
			<Link to="/register" className={'register-link'}>
				<RaisedButton primary={true} label="Register" style={style} />
			</Link>
		</div>
		<div className="inline-block col-4">
			<Link to="/about">
				<RaisedButton primary={true} label="About Us" style={style} />
			</Link>
		</div>
	</div>
);

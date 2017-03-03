import React from 'react';
import Footer from '../components/Footer';

export default (props) => {
	return (
	<div id="homepage">
		<h1 className="title">Welcome To Border Buddy</h1>
		{
			props.children
		}
		<Footer />
	</div>
	);
};

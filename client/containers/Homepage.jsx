import React from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default (props) => {
	return (
	<div id="homepage">
		<h1 className="title">Welcome To Border Buddy</h1>
		<Navbar />
		{
			props.children
		}
		<Footer />
	</div>
	);
};

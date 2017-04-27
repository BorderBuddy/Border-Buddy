import React from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default (props) => {
	return (
	<div id="homepage">
		<div id="banner" className="col-12">
			<img style={styles.image} src="/images/logos-png/BB_Logo-Type-White.png" />
		</div>
		<Navbar />
		{
			props.children
		}
		<Footer />
	</div>
	);
};

const styles = {
	image: {
		display: 'block',
		margin: 'auto',
		width: '50%'
	}
}
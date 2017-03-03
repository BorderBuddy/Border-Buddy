import React from 'react';

export default (props) => {
	return (
	<div id="homepage">
		<h1 className="txt-center">Welcome To Border Buddy</h1>
		{
			props.children
		}
	</div>
	);
};

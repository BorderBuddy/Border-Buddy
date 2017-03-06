import React from 'react';

export default () => (
	<div className="clearfix tab-container">
		<div className="col-12">
			<h2 className="mx-auto h1 center subtitle">About Us</h2>
		</div>
		<div className="col-12">
			<p className="center">We started at Hack the Ban</p>
			<a href="vocativ.com/405756/coders-hack-trump-immigration-ban/" target="_blank" rel="noopener noreferrer">
				<img className="hacktheban-link" src="/images/hacktheban.png" />
			</a>

			<p className="center">Now we're testing our app with real users</p>
			<p className="center">If you'd like to contribute, check out our Github</p>
			
			<div className="col-6 inline-block">
				<a href="http://www.cunyclear.org/" target="_blank" rel="noopener noreferrer">
					<img className="partner-link" src="/images/CLEAR.png" />
				</a>
			</div>

			<div className="col-6 inline-block">
				<a href="https://mpowerchange.org/" target="_blank" rel="noopener noreferrer">
					<img className="partner-link" src="/images/mpower.png" />
				</a>
			</div>

			<div className="col-12">
				<a href="https://github.com/EmilyDev/Border-Buddy" target="_blank" rel="noopener noreferrer">
					<img className="github-link" src="/images/github.png" />
				</a>
			</div>

		</div>
	</div>
);
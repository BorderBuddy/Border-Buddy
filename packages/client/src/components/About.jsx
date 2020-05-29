import React from 'react';

export default () => (
	<div className="clearfix tab-container about">
		<div className="col-12">
			<h2 className="mx-auto h1 center subtitle">About Us</h2>
		</div>
		<div className="col-12">
			<p className="center">We started at Hack the Ban.</p>
			<a href="http://www.vocativ.com/405756/coders-hack-trump-immigration-ban/" target="_blank" rel="noopener noreferrer">
				<img className="hacktheban-link" src="/images/hacktheban.png" />
			</a>

			<p className="center">Now we're getting ready to test our app with real users.</p>
			<p className="center">Our partner organizations, MPower Change and CUNY-CLEAR, provide the legal advocacy and community outreach services that really make our platform come to life. You can learn more about them via the links below.</p>

			<div className="col-12 partner-container">
				<div className="col-6 img-container inline-block">
					<a href="http://www.cunyclear.org/" target="_blank" rel="noopener noreferrer">
						<img src="/images/CLEAR.png" />
					</a>
				</div>

				<div className="col-6 img-container inline-block">
					<a href="https://mpowerchange.org/" target="_blank" rel="noopener noreferrer">
						<img src="/images/mpower.png" />
					</a>
				</div>
			</div>

			<div className="col-12">
				<p className="center">If you'd like to contribute to our project, please check out our Github.</p>
				<a href="https://github.com/EmilyDev/Border-Buddy" target="_blank" rel="noopener noreferrer">
					<img className="github-link" src="/images/github.png" />
				</a>
			</div>

		</div>
	</div>
);

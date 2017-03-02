import { config } from '../config';
import Traveler from '../../database/models/travelers';
import _ from 'lodash';
const Twilio = require('twilio')(config.twilio.accountSid, config.twilio.authToken);
const chalk = require('chalk')

// admin hits this api to send text to users
export const sendText = (req, res, next) => {
	if (_.isEmpty(req.body)) {
		let err = new Error('No message body');
		err.status = 404;
		next(err);
	}

	Twilio.sendMessage({
	    to: req.body.to,
	    from: config.twilio.adminPhone,
	    // messagingServiceSid: config.twilio.messagingSid, // not working in dev mode so removed
	    body: req.body.message,
	}, (err, result) => {
		if (err) next(err);
		return res.status(200).json(result);
	});

};

export const respondToText = (req, res, next) => {
	console.log('JUST HIT THIS ROUTE', req)
	console.log(chalk.blue('REQ BODY IS', req.body))
	var response = req.body.Body;
	var phoneStrTo = req.body.To.substring(req.body.To.length - 11);
	var phoneStrFrom = req.body.From.substring(req.body.From.length - 10);

	if (response.toLowerCase() === 'ok') {
		return Traveler.find({
		    where: {
					phone: phoneStrTo
		    }
		})
		.then(traveler => {
		    if (!traveler) {
					return res.status(404).end();
		    }
		    traveler.status = 'cleared';
		    traveler.save()
				.then(function(traveler) {
			    return res.json(traveler);
		    });

		    return res.status(200).end();
		})
		.catch(next);
	} else {
		// TODO: Scheduler for sending a text again to user prompting status if ok
	}

	return res.status(200).json({});
}


/*------------ HELPER FUNCTION FOR CRON JOB ONLY -------------*/

export const sendVerification = (body, user) => {
	Twilio.sendMessage({

		to: user.phone,
		from: config.twilio.adminPhone,
		body

	});
};


import { config } from '../config';
import _ from 'lodash';
const Twilio = require('twilio')(config.twilio.accountSid, config.twilio.authToken);     

export function sendText(req, res){
	if (_.isEmpty(req.body)) {
		return res.status(404).json({});
	}

    Twilio.messages.create({
        to: req.body.to,
        from: config.twilio.adminPhone,
        body: req.body.message,
    }, function(err, result) {
    	return res.status(200).json(result);
    });
};
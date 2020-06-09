"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.notifyAdminOfNewTravelerSignUp = exports.respondToText = exports.sendText = exports.Twilio = void 0;
const config2_1 = require("../config2");
const travelers_1 = require("../database/models/travelers");
const user_1 = require("../database/models/user");
const lodash_1 = __importDefault(require("lodash"));
const bluebird_1 = __importDefault(require("bluebird"));
exports.Twilio = require('twilio')(config2_1.config.twilio.accountSid, config2_1.config.twilio.authToken);
// admin hits this api to send text to users
exports.sendText = (req, res, next) => {
    if (lodash_1.default.isEmpty(req.body)) {
        return res.status(404).end();
    }
    exports.Twilio.sendMessage({
        to: req.body.to,
        from: config2_1.config.twilio.adminPhone,
        body: req.body.message
    }, (err, result) => {
        if (err)
            console.error(err);
        return res.status(200).json(result);
    });
};
// webhook from twilio will hit this route
exports.respondToText = (req, res, next) => {
    const msgBody = req.body.Body;
    const travelerPhone = req.body.From.slice(2, req.body.From.length); // remove +1
    if (req.body.AccountSid !== config2_1.config.twilio.accountSid) {
        return res.status(403).end();
    }
    // TODO: handle 'sos' responses
    if (msgBody.toLowerCase() !== 'ok') {
        return res.status(400).end();
    }
    travelers_1.Traveler.findOne({
        where: {
            phone: travelerPhone
        }
    })
        .then(traveler => {
        if (!traveler) {
            return res.status(404).end();
        }
        traveler.status = 'cleared';
        return traveler.save();
    })
        .then(traveler => {
        const xml = `
		<?xml version="1.0" encoding="UTF-8"?>
		<Response>
		    <Message>Welcome home, ${traveler.name}! You have been marked as cleared. Thanks for using BorderBuddy.</Message>
		</Response>`;
        res.status(200).send(xml);
    })
        .catch(next);
};
// sends a text to all admin users when traveler signs up
exports.notifyAdminOfNewTravelerSignUp = (traveler) => {
    return user_1.User.findAll()
        .then((adminUsers) => {
        return bluebird_1.default.each(adminUsers, user => {
            exports.Twilio.sendMessage({
                to: user.phone,
                from: config2_1.config.twilio.adminPhone,
                body: `New Traveler: ${traveler.name} has just registered on Border Buddy.` +
                    'Check https://border-buddy.com/admin for more details.'
            }, (err, result) => {
                if (err)
                    console.error(err);
                return { result, traveler };
            });
        })
            .then((ok) => {
            console.log(ok);
            return traveler;
        });
    });
};
//# sourceMappingURL=twilio.controller.js.map
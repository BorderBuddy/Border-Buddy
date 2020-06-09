"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config2_1 = require("../config2");
const chalk_1 = __importDefault(require("chalk"));
const defaultClient = require('twilio')(config2_1.config.twilio.accountSid, config2_1.config.twilio.authToken);
class TravelerNotifier {
    constructor({ client = defaultClient } = {}) {
        this.client = client;
    }
    onRegistrationSuccess(traveler) {
        this.client.sendMessage({
            to: traveler.phone,
            from: config2_1.config.twilio.adminPhone,
            body: `Thanks for registering with BorderBuddy, ${traveler.name}! ` +
                'Safe travels, and text OK to this number after you pass through customs and immigration.'
        }, (err) => {
            if (err)
                console.error(chalk_1.default.red('ERROR SENDING CONFIRMATION TEXT', err.message));
        });
    }
}
exports.default = TravelerNotifier;
//# sourceMappingURL=travelerNotifier.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
dotenv_1.config();
module.exports = {
    SESSION_SECRET: process.env.SESSION_SECRET,
    FLIGHT_STATS_ID: process.env.FLIGHT_STATS_ID,
    FLIGHT_STATS_KEY: process.env.FLIGHT_STATS_KEY,
    TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
    TWILIO_MESSAGING_SID: process.env.TWILIO_MESSAGING_SID,
    TWILIO_PHONE_NUM: process.env.TWILIO_PHONE_NUM,
    NAZ_NUM: process.env.NAZ_NUM,
    TAREK_NUM: process.env.TAREK_NUM
};
//# sourceMappingURL=appConfig.js.map
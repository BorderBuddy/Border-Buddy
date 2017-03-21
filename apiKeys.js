import {config} from 'dotenv';

config();
module.exports = {
  FLIGHT_STATS_ID: process.env.FLIGHT_STATS_ID,
  FLIGHT_STATS_KEY: process.env.FLIGHT_STATS_KEY,
  TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
  TWILIO_MESSAGING_SID: process.env.TWILIO_MESSAGING_SID,
  TWILIO_PHONE_NUM: process.env.TWILIO_PHONE_NUM
};

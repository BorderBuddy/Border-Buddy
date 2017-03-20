import path from 'path';
import _ from 'lodash';
import apiKeys from '../../apiKeys'

const isTesting = process.env.NODE_ENV === 'test';
const dbUsername = 'postgres';
const dbPassword = 'root';
const dbName = 'BorderBuddy' + (isTesting ? '_test' : '');

const databaseUrl  = _.get(process.env,
  'DATABASE_URL',
  `postgres://${dbUsername}:${dbPassword}@localhost:5432/${dbName}`);

export const config = {
  env: process.env.NODE_ENV,
  root: path.normalize(`${__dirname}/../../..`),
  port: _.get(process.env, 'PORT', 3000),
  secrets: {
    session: _.get(process.env, 'SESSION_SECRET', 'border buddy bl@h bl@h')
  },
  database: {
    url: databaseUrl
  },
  twilio: {
    adminPhone: apiKeys.TWILIO_PHONE_NUM,
    messagingSid: apiKeys.TWILIO_MESSAGING_SID,
    accountSid: apiKeys.TWILIO_ACCOUNT_SID,
    authToken: apiKeys.TWILIO_AUTH_TOKEN
  }
};

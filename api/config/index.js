import path from 'path';
import _ from 'lodash';
import appConfig from '../../appConfig';

const isTesting = process.env.NODE_ENV === 'test';
const dbUsername = 'postgres';
const dbPassword = 'root';
const dbName = 'BorderBuddy' + (isTesting ? '_test' : '');

const databaseUrl = _.get(process.env,
  'DATABASE_URL',
  `postgres://${dbUsername}:${dbPassword}@localhost:5432/${dbName}`);

export const config = {
  env: process.env.NODE_ENV,
  root: path.normalize(`${__dirname}/../../..`),
  port: _.get(process.env, 'PORT', 3000),
  secrets: {
    session: _.get(process.env, 'SESSION_SECRET')
  },
  database: {
    url: databaseUrl
  },
  twilio: {
    adminPhone: appConfig.TWILIO_PHONE_NUM,
    messagingSid: appConfig.TWILIO_MESSAGING_SID,
    accountSid: appConfig.TWILIO_ACCOUNT_SID,
    authToken: appConfig.TWILIO_AUTH_TOKEN
  }
};

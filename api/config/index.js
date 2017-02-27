import path from 'path';
import _ from 'lodash';

export var config = {
  env: process.env.NODE_ENV,
  root: path.normalize(`${__dirname}/../../..`),
  port: _.get(process.env, 'PORT', 3000),
  secrets: {
    session: _.get(process.env, 'SESSION_SECRET', 'border buddy bl@h bl@h')
  },
  database: {
	  username: 'postgres',
	  password: 'root'
  },
  twilio: {
    adminPhone: '+16467604992',
    messagingSid: 'MGf13fd7032263f8f5e2c734bade0803c5',
    accountSid: process.env.TWILIO_ACCOUNT_SID || 'ACde926fde88fb151e8e1ef78ae455c857',
    authToken: process.env.TWILIO_AUTH_TOKEN || '6e55da4fe90cbeaa74a981819dfaef38'
  }
};
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
    adminPhone: process.env.TWILIO_PHONE_NUM || '+15005550006', // limited functionality https://www.twilio.com/docs/api/rest/test-credentials
    messagingSid: process.env.TWILIO_MESSAGING_SID || 'MGba927c2be4ce4dceff68aa24b4e85a32',
    accountSid: process.env.TWILIO_ACCOUNT_SID || 'ACdf9040cbb781f0eb315a6ef0bd4def99', // test version hard-coded
    authToken: process.env.TWILIO_AUTH_TOKEN || '246e9034039a5bdfeb5e8fd2027f42c9' // test version hard-coded
  }
};

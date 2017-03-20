let secrets = {
  'development' : {
    FLIGHT_STATS_ID: '17c88dbb',
    FLIGHT_STATS_KEY: '853aef0a97a203b18f7299192ccf0869',
    TWILIO_ACCOUNT_SID: 'ACdf9040cbb781f0eb315a6ef0bd4def99',
    TWILIO_AUTH_TOKEN: '246e9034039a5bdfeb5e8fd2027f42c9',
    TWILIO_MESSAGING_SID: 'MGba927c2be4ce4dceff68aa24b4e85a32',
    TWILIO_PHONE_NUM: '+15005550006'
  },
  'test' : {
    FLIGHT_STATS_ID: '',
    FLIGHT_STATS_KEY: '',
    TWILIO_ACCOUNT_SID: '',
    TWILIO_AUTH_TOKEN: '',
    TWILIO_MESSAGING_SID: '',
    TWILIO_PHONE_NUM: ''
  },
  'production': {
    FLIGHT_STATS_ID: process.env.FLIGHT_STATS_ID,
    FLIGHT_STATS_KEY: process.env.FLIGHT_STATS_KEY,
    TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
    TWILIO_MESSAGING_SID: process.env.TWILIO_MESSAGING_SID,
    TWILIO_PHONE_NUM: process.env.TWILIO_PHONE_NUM
  }
};
module.exports = secrets[process.env.NODE_ENV || 'development'];

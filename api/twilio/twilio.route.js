import {
  respondToText,
	sendText
} from './twilio.controller';

const base = '/api/twilio';

export default (app) => {
  app.post(base + '/send', sendText);
  app.post(base + '/autoRespond', respondToText);
};

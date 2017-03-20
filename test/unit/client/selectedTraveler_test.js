import {updateTraveler, sendText} from '../../../client/actions/selectedTraveler';
import './../unit_helpers';
import axios from 'axios';

describe('SelectedTraveler', () => {
  let sandbox;
  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    sandbox.restore();
  });
  describe('update traveler information', () => {
    it('sends a put request to traveler api with accessToken', () => {
      const window = {localStorage: {accessToken: 'accessToken'}};

      sandbox.stub(axios, 'put', (url, traveler, headers) => {
        expect(url).to.equal('/api/traveler/1');
        expect(traveler.name).to.equal('Jane Austen');
        expect(headers.headers['Authorization']).to.equal('accessToken');
        return new Promise((resolve, reject) => {
        });
      });

      updateTraveler({name: 'Jane Austen'}, 1, window)();
    });
  });

  describe('admin manually sends SMS to traveler', () => {
    it('sends a POST to twilio API with accessToken', () => {
      const window = {localStorage: {accessToken: 'accessToken'}};

      sandbox.stub(axios, 'post', (url, message, headers) => {
        expect(url).to.equal('/api/twilio/send');
        expect(message.to).to.equal('5553334444');
        expect(headers.headers['Authorization']).to.equal('accessToken');
        return new Promise((resolve, reject) => {
        });
      });

      sendText({phone: '5553334444'}, window)();
    });
  });
});

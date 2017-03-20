import './../unit_helpers';
import {signup} from '../../../client/actions/auth';
import axios from 'axios';

describe('User', () => {

  describe('Creating new admin user', () => {
    it('sends a post request to create user api with accessToken', () => {
      let window = {localStorage: {accessToken: 'accessToken'}};

      sinon.stub(axios, 'post', (url, user, headers) => {
        expect(url).to.equal('/api/user');
        expect(user.name).to.equal('Jane Austen');
        expect(headers.headers['Authorization']).to.equal('accessToken');
        return new Promise((resolve, reject) => {});
      });

      signup({name: 'Jane Austen'}, window)();
    });
  });
});


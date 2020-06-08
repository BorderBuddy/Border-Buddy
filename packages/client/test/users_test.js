import './../unit_helpers';
import { fetchAllUsers } from '../../client/actions/users';
import axios from 'axios';

describe('Action: Users', () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('fetch all users', () => {
    it('sends a get request to user api with accessToken', () => {
      const window = {localStorage: {accessToken: 'accessToken'}};

      sandbox.stub(axios, 'get', (url, headers) => {
        expect(url).to.equal('/api/user');
        expect(headers.headers['Authorization']).to.equal('accessToken');
        return new Promise((resolve, reject) => {
        });
      });

      fetchAllUsers(window)();
    });
  });
});

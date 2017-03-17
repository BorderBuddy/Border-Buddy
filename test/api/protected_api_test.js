import './api_helpers';
import app from '../../api/server';

describe('protected endpoints', () => {

  let request;
  beforeEach(() => {
    request = chai.request(app);
  });

  const endpoints = [
    {method: 'GET', path: '/api/traveler/'},
    {method: 'GET', path: '/api/traveler/1234'},
    {method: 'PUT', path: '/api/traveler/1234'},

    {method: 'GET', path: '/api/user/'},
    {method: 'GET', path: '/api/user/me'},
    {method: 'GET', path: '/api/user/1234'},
    {method: 'POST', path: '/api/user/'},
    {method: 'PUT', path: '/api/user/1234/password'},
    {method: 'DELETE', path: '/api/user/1234'},

    {method: 'POST', path: '/api/twilio/send'},
  ];

  endpoints.forEach((endpoint) => {
    describe(`${endpoint.method} ${endpoint.path}`, () => {
      describe('when called without an API token', () => {
        it('responds with a 401 Unauthorized', (done) => {
          request[endpoint.method.toLowerCase()](endpoint.path)
            .end((err, res) => {
              expect(res).to.have.status(401);
              done();
            });
        });
      });
    });
  });
});

import superagent from 'superagent';
import { camelizeKeys } from 'humps';

function csrfSafeMethod(method) {
  // these HTTP methods do not require CSRF protection
  return (/^(get|head|options|trace)$/.test(method));
}

function createHTTPRequest(method) {
  return (path, options = {}) => {
    return new Promise((resolve, reject) => {
      /* eslint-disable */
      const fullPath = DEV ? `http://localhost:3000/api${path}` : path;
      /* eslint-enable */
      const request = superagent[method](fullPath);

      /* eslint-disable */
      if ( !csrfSafeMethod(method) ) {
        request.set('X-CSRFToken', Cookies.get('schol_csrftoken'));
      }
      /* eslint-enable */

      if ( options.form ) {
        request.type('form');
      }

      if ( options.params ) {
        request.query(options.params);
      }

      if ( options.data ) {
        request.send(options.data);
      }

      request.end((err, res) => {
        if ( err ) {
          reject({ err, res });
        } else {
          resolve(res.body ? res.body : res);
        }
      });
    });
  };
}

const get = createHTTPRequest('get');
const post = createHTTPRequest('post');
const put = createHTTPRequest('put');
const del = createHTTPRequest('del');

function camelizeResponse(request) {
  return request.then(camelizeKeys);
}

export function loadUser(id) {
  return camelizeResponse(get('/user'));
}

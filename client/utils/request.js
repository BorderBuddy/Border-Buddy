import qs from "qs";
const apiUrl = 'http://localhost:3000/api';

function ResponseError(code = 500, response) {
  const message = response.detail || response.title;

  this.message = message;
  this.errors = response.errors || {};
  this.statusCode = code;
  this.name = "ResponseError";
  const err = Error(message);
  this.stack = err.stack;
}

ResponseError.prototype = Object.create(Error.prototype);
ResponseError.prototype.constructor = ResponseError;

function handleErrors(res) {
  if (!res.ok) {
    // Resolve to JSON so we have the full body
    return res.json().then((jsonResponse) => {
      throw new ResponseError(res.status, jsonResponse);
    });
  }

  return res;
}

function wrapFetchWithCustomHeaders(action) {
  return (urlPath, data) => {
    const fullURL = `${apiUrl}${urlPath}`;
    const headers = {
      "Accept": "application/json",
      "Content-Type": "application/json",
    };

    let request;

    if (action == "GET") {
      const url = data ? fullURL.concat(`?${qs.stringify(data)}`) : fullURL;

      request = new Request(url, {
        method: action,
        headers: new Headers(headers),
      });
    } else {
      request = new Request(fullURL, {
        method: action,
        headers: new Headers(headers),
        body: JSON.stringify(data),
      });
    }

    return fetch(request)
      .then(res => handleErrors(res))
      .then(res => res.json());
  };
}

const get = wrapFetchWithCustomHeaders("GET");
const post = wrapFetchWithCustomHeaders("POST");
const put = wrapFetchWithCustomHeaders("PUT");
const _delete = wrapFetchWithCustomHeaders("DELETE");

export {
  get,
  post,
  put,
  _delete,
};

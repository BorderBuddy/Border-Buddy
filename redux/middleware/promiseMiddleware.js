import { assign, omit } from 'lodash';
import * as apiClient from '../../api_client';

export default function promiseMiddleware({ dispatch, getState }) {
  return (next) => (action) => {
    const { payload, type, meta } = action;

    if ( !payload || !payload.apiPayload ) {
      return next(action);
    }

    const { apiPayload } = payload;
    const restPayload = omit(payload, 'apiPayload');

    next({
      type,
      payload: restPayload,
      meta: assign({}, meta, { loading: true })
    });

    return apiPayload(apiClient, dispatch, getState)
    .then((result) => {
      dispatch({
        type,
        payload: result,
        meta: assign({}, meta, {
          initialPayload: restPayload
        })
      });

      return result;
    })
    .catch((error) => {
      dispatch({
        type,
        payload: error,
        meta: assign({}, meta, {
          initialPayload: restPayload,
          error: true
        })
      });

      return Promise.reject(error);
    });
  };
}

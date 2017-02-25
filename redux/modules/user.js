import { assign, identity } from 'lodash';
import { handleAsyncAction } from '../utils';

const LOAD_USER = 'user/LOAD_USER';

const handleLoadUser = handleAsyncAction(
  identity,
  (state, { payload }) => {
    return assign({}, state, { user: payload });
  }
);

const initialState = {
  user: {}
};

export default function reducer(state = initialState, action = {}) {
  const { type, payload } = action;
  switch (type) {
    case LOAD_USER:
      return handleLoadUser(state, action);

    default:
      return state;
  }
}

export function loadUser(id) {
  return {
    type: LOAD_USER,
    payload: {
      apiPayload(apiClient) {
        return apiClient.loadUser();
      }
    }
  };
}

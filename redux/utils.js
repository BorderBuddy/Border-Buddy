import { identity } from 'lodash';

export const handleAsyncAction = (loading = identity, success = identity, fail = identity) => {
  return (state, action) => {
    const { meta } = action;
    const isError = meta && meta.error;
    const isLoading = meta && meta.loading;

    if ( isLoading ) {
      return loading(state, action);
    }

    if ( isError ) {
      return fail(state, action);
    }

    return success(state, action);
  };
};

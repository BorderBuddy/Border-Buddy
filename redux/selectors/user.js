import { bindActionCreators } from 'redux';
import { createSelector } from 'reselect';
import * as userActions from '../modules/user';

const userSelector = ({ user }) => user; // { user } = global state

export const selector = createSelector(
  [userSelector],
  (user) => ({
    userState: user
  })
);

export function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators(userActions, dispatch)
  };
}

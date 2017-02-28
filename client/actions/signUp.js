import { post } from "../utils/request";
import {
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAILURE
} from '../constants';


export function signup(params) {
  return (dispatch) => {
    dispatch({type: USER_SIGNUP_REQUEST});

    return post(`/travelers/add`, params)
      .then((res)  => dispatch({type: USER_SIGNUP_SUCCESS, data: res}))
      .catch((res) => dispatch({type: USER_SIGNUP_FAILURE, data: res}));
  };
}

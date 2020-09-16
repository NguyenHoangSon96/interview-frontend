import axios from 'axios';
import { SET_ERROR, FETCH_USER_LOGIN } from "./actionType";
import { REGISTER_URL } from "./endpoints";

export function createAccount(payload) {
  return function (dispatch) {
    axios.post(REGISTER_URL, payload)
      .then(response => {
        dispatch({type: FETCH_USER_LOGIN, payload: response.data});
      })
      .catch(e => {
        dispatch({type: SET_ERROR, error: e});
        console.error("##register##: " + e);
      });
  }
}

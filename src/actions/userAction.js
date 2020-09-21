import axios from 'axios';
import { SET_ERROR, FETCH_USER_LOGIN, SET_USER_PROFILE } from "./actionType";
import { REGISTER_URL, LOGIN_URL } from "./endpoints";

// export function createAccount(payload) {
//   return function (dispatch) {
//     axios.post(REGISTER_URL, payload)
//       .then(response => {
//         dispatch({type: FETCH_USER_LOGIN, payload: response.data});
//       })
//       .catch(error => {
//         dispatch({type: SET_ERROR, error: error});
//         console.error("##register##: " + error);
//       });
//   }
// }

export function login(data) {

}

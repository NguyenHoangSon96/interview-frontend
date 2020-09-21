import {SET_USER_PROFILE, LOGOUT} from "../actions/actionType";


let initialState = {
  userProfile: undefined
}

const userReducer = (state = initialState, { type, data }) => {
  switch (type) {
    case SET_USER_PROFILE:
      return { ...state, userProfile: {...data}}
    case LOGOUT:
      return { ...state, userProfile: undefined}
    default:
      return state
  }
}

export default userReducer;


// let toasts = [
//   { position: 'static'},
//   { position: 'static'},
//   { position: 'top-right', autohide: 3000 }
// ];
// let toasters = (()=>{
//   return toasts.reduce((toasters, toast) => {
//     toasters[toast.position] = toasters[toast.position] || []
//     toasters[toast.position].push(toast)
//     return toasters
//   }, {})
// })();

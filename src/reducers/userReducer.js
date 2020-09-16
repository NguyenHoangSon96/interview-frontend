
let initialState = {
  userProfile: {}
}

const userReducer = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case 'FETCH_USER':
      return {...state, ...rest }
    default:
      return state
  }
}

export default userReducer;

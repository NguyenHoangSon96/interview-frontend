
let initialState = {
  bookings: [],
}

const bookingReducer = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case 'GET_Booking':
      return {...state, ...rest }
    default:
      return state
  }
}

export default bookingReducer;

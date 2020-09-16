let initialState = {
  loading: false,
  error: undefined,
  sidebarShow: 'responsive',
}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.loading,
      }
    case 'SET_ERROR':
      return {
        ...state,
        error: action.error,
      }
    default:
      return state
  }
}

export default rootReducer;

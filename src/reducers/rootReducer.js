let initialState = {
  loading: false,
  error: undefined,
  sidebarShow: 'responsive',
  minimizeSidebar: true,
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
    case 'SET_MINIMIZE_SIDEBAR':
      return {
        ...state,
        minimizeSidebar: action.minimizeSidebar,
      }
    default:
      return state
  }
}

export default rootReducer;

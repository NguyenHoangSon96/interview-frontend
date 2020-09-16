import {SET_ERROR, SET_LOADING} from "./actionType";


export function setError(error) {
  return {
    type: SET_ERROR,
    payload: error
  }
}

export function setLoading(data) {
  return {
    type: SET_LOADING,
    payload: data
  }
}


import { createStore, combineReducers , applyMiddleware, compose  } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

import rootReducer from "./reducers/rootReducer";
import userReducer from "./reducers/userReducer";
import bookingReducer from "./reducers/bookingReducer";

const loggerMiddleware = createLogger();


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  combineReducers({
    root: rootReducer,
    user: userReducer,
    booking: bookingReducer,
  }),
  composeEnhancers(applyMiddleware(
    thunkMiddleware,
    loggerMiddleware,
  )),
)
export default store;

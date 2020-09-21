import { createStore, combineReducers , applyMiddleware, compose  } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import rootReducer from "./reducers/rootReducer";
import userReducer from "./reducers/userReducer";
import bookingReducer from "./reducers/bookingReducer";

const loggerMiddleware = createLogger();

const persistConfig = {
  key: 'interview_app',
  storage,
};

const combinedReducers = combineReducers({
  root: rootReducer,
  user: userReducer,
  booking: bookingReducer,
});

const persistedReducers = persistReducer(persistConfig, combinedReducers);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  persistedReducers,
  composeEnhancers(applyMiddleware(
    thunkMiddleware,
    loggerMiddleware,
  )),
)

export const persistor = persistStore(store);
export default store;

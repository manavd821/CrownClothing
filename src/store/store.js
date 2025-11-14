import { createStore, applyMiddleware, compose } from 'redux'
import { rootReducer } from './rootReducer'
import logger from 'redux-logger'
import { customeLogger } from '../middleware/logger.redux'
import { persistStore, persistReducer } from 'redux-persist'
import {thunk} from 'redux-thunk'
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage: storage,
    whitelist: ['cart'], // only cart will be persisted
    blacklist: ['user'] // user will not be persisted
}

const persistedReducer = persistReducer(persistConfig, rootReducer);
const middlewares = [thunk];
if (process.env.NODE_ENV !== 'production') {
  middlewares.push(customeLogger);
}
const middleWareEnhancer = applyMiddleware(...middlewares);
const composeEnhancer = (process.env.NODE_ENV !== 'production' && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const composeEnhancers = composeEnhancer(middleWareEnhancer);
export const store = createStore(persistedReducer, undefined ,composeEnhancers);
export const persistor = persistStore(store);
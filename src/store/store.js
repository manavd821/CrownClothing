import { createStore, applyMiddleware, compose } from 'redux'
import { rootReducer } from './rootReducer'
import logger from 'redux-logger'
import { customeLogger } from '../middleware/logger.redux'
import { persistStore, persistReducer } from 'redux-persist'
import {thunk} from 'redux-thunk'
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware  from 'redux-saga';
import { rootSaga } from './root-saga';

const persistConfig = {
    key: 'root',
    storage: storage,
    whitelist: ['cart'], // only cart will be persisted
    blacklist: ['user'] // user will not be persisted
}

const sagaMiddleware = createSagaMiddleware()

const persistedReducer = persistReducer(persistConfig, rootReducer);
const middlewares = [sagaMiddleware];
if (process.env.NODE_ENV !== 'production') {
  middlewares.push(customeLogger);
}
const middleWareEnhancer = applyMiddleware(...middlewares);
const composeEnhancer = (process.env.NODE_ENV !== 'production' && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const composeEnhancers = composeEnhancer(middleWareEnhancer);
export const store = createStore(persistedReducer, undefined ,composeEnhancers);

sagaMiddleware.run(rootSaga);
export const persistor = persistStore(store);
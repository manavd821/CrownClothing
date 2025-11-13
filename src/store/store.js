import { createStore, applyMiddleware, compose } from 'redux'
import { rootReducer } from './rootReducer'
import logger from 'redux-logger'
import { customeLogger } from '../middleware/logger.redux'
import { persistStore, persistReducer } from 'redux-persist'

const persistConfig = {
    key: 'root',
    storage: localStorage,
    whitelist: ['cart'], // only cart will be persisted
    blacklist: ['user'] // user will not be persisted
}

const persistedReducer = persistReducer(persistConfig, rootReducer);
const composeEnhancer = (process.env.NODE_ENV !== 'production' && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const composeEnhancers = composeEnhancer(applyMiddleware(logger));
const middlerwares = [process.env.NODE_ENV !== 'production' && customeLogger].filter(Boolean);
export const store = createStore(persistedReducer, composeEnhancers);
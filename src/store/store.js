import { createStore, applyMiddleware } from 'redux'
import { rootReducer } from './rootReducer'
import logger from 'redux-logger'

const middlerwares = [logger]
export const store = createStore(rootReducer, applyMiddleware(...middlerwares));
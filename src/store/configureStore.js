import rootReducer from '../reducers'
import { createStore, applyMiddleware, compose } from 'redux'
import reduxMulti from 'redux-multi'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
const logger = createLogger()

const createStoreWithMiddleware = applyMiddleware(
  thunk,
  reduxMulti,
  // logger
)

const store = createStore(rootReducer, compose(createStoreWithMiddleware))

export default store


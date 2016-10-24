import App from '../reducers'
import { createStore, applyMiddleware, compose } from 'redux'
import reduxMulti from 'redux-multi'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
const logger = createLogger()

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
  reduxMulti,
  // logger
)

const store = createStore(App,
  compose(createStoreWithMiddleware, window.devToolsExtension ? window.devToolsExtension() : f => f))

export default store

import thunk from 'redux-thunk'
import { browserHistory } from 'react-router'
import { routerMiddleware } from 'react-router-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import createLogger from 'redux-logger'
import rootReducer from '../reducers'

const reduxRouterMiddleware = routerMiddleware(browserHistory)

const logger = createLogger({
  level: 'info',
  collapsed: true,
})
const store = createStore(rootReducer, compose(
  applyMiddleware(thunk, reduxRouterMiddleware, logger),
))

export default store

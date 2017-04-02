import React from 'react'
import ReactDOM from 'react-dom'
import { Router, hashHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { Provider } from 'react-redux'
import './styles/core.scss'

import configureStore from './store/configureStore'
import configureRoutes from './routes/index'

export const store = configureStore(hashHistory)
const history = syncHistoryWithStore(hashHistory, store)

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      { configureRoutes(store) }
    </Router>
  </Provider>,
  document.getElementById('root'),
)

import React from 'react'
import { Router, browserHistory, Route, IndexRoute } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import store from '../store/configureStore'

import App from '../containers/App'
import Home from '../views/HomeView'

const history = syncHistoryWithStore(browserHistory, store)

export default (
  <Router history={history} >
    <Route path='/' component={App} >
      <IndexRoute component={Home} />
    </Route>
  </Router>
)

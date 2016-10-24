import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './store/configureStore'
import './styles/core.scss'
import App from './containers/App'
import Home from './views/Home'
import Start from './views/Start'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

ReactDOM.render(
  <Provider store={store} >
    <Router history={browserHistory} >
      <Route path='/' component={App} >
        <IndexRoute component={Home} />
        <Route path='/Start' component={Start} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
)


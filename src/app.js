import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './store/configureStore'
import routes from './routes'
import './styles/core.scss'

ReactDOM.render(
  <Provider store={store} >
    {routes}
  </Provider>,
  document.getElementById('root'),
)


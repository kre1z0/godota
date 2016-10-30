import React from 'react'
import ReactDOM from 'react-dom'
import store from './store/configureStore'
import { Provider } from 'react-redux'
import CoreLayout from './layouts/CoreLayout.js'
import './styles/main.scss'
import moment from 'moment'
moment.locale('ru')

ReactDOM.render(
  <Provider store={store} >
    <CoreLayout />
  </Provider>,
  document.getElementById('root')
)


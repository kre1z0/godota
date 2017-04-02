import React from 'react'
import { Route } from 'react-router'

import App from '../containers/App'
import Home from '../views/HomeView'
import News from '../views/NewsView'

export default(store) => {
  console.log('STORE <==', store)
  return (
    <Route component={App} >
      <Route path='/' component={Home} />
      <Route path='/news/' component={News} />
    </Route>
  )
}

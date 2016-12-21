import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import Youtube from './youtube'
import Twitch from './twitch'

const rootReducer = combineReducers({
  Youtube,
  Twitch,
  routing: routerReducer,
})

export default rootReducer

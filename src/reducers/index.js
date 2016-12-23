import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import Video from './video'
import Youtube from './youtube'
import Twitch from './twitch'

const rootReducer = combineReducers({
  Video,
  Youtube,
  Twitch,
  routing: routerReducer,
})

export default rootReducer

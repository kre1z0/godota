import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import Video from './video'
import Youtube from './youtube'
import Twitch from './twitch'
import News from './news'

const rootReducer = combineReducers({
  Video,
  Youtube,
  Twitch,
  News,
  routing: routerReducer,
})

export default rootReducer

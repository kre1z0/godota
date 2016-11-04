import { combineReducers } from 'redux'
import Youtube from './Youtube'
import Twitch from './Twitch'

const rootReducer = combineReducers({
  Youtube,
  Twitch
})

export default rootReducer

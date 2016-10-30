import { combineReducers } from 'redux'
import Youtube from './Youtube'
import Twitch from './Twitch'

const App = combineReducers({
  Youtube,
  Twitch
})

export default App

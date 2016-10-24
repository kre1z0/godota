import { combineReducers } from 'redux'
import Youtube from './Youtube'
import Twitch from './Twitch'
import ChangeGame from './ChangeGame'

const App = combineReducers({
  Youtube,
  Twitch,
  ChangeGame
})

export default App

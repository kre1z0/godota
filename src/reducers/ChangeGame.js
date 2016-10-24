import dota2youtube from '../json/dota2-youtube.json'

const ChangeGame = (state = {
  youtubeGame: dota2youtube,
  twitterGame: 'https://twitter.com/Kreiz0/lists/dota'
}, action) => {
  switch (action.type) {
    case 'LOAD_TWITCH':
      return {
        ...state,
        twitchGame: action.twitchGame
      }
    case 'LOAD_YOUTUBE':
      return {
        ...state,
        youtubeGame: action.youtubeGame
      }
    case 'LOAD_TWITTER':
      return {
        ...state,
        twitterGame: action.twitterGame
      }
    default:
      return state
  }
}

export default ChangeGame


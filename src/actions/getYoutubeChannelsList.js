import 'isomorphic-fetch'
import store from '../store/configureStore'

export function getYoutubeChannelsList () {
  const url = './json/youtube.json'
  fetch(url)
    .then(response => response.json())
    .then((json) => {
      json.sort((a, b) => {
        if (a.name > b.name) {
          return 1
        }
        if (a.name < b.name) {
          return -1
        }
        return 0
      })
      store.dispatch({ type: 'YOUTUBE_CHANNEL_LIST', youtubeChannelsList: json })
    }).catch((error) => {
      store.dispatch({ type: 'YOUTUBE_CHANNEL_LIST_ERROR', youtubeChannelsListError: error })
    })
}

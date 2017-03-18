import 'isomorphic-fetch'
import * as actions from '../actions/youtube'
import { SEARCH_REQUEST } from '../constants/youtube'

export function getNextVideos(PageToken, channelId) {
  return (dispatch) => {
    const url = `${SEARCH_REQUEST}maxResults=15&channelId=${channelId}&order=date&pageToken=${PageToken}`
    fetch(url).then(response => response.json())
      .then((json) => {
        const items = json.items
        const next = json.nextPageToken
        const prev = json.prevPageToken
        dispatch({
          type: actions.LOAD_YOUTUBE_VIDEOS,
          nextPageToken: next,
          prevPageToken: prev,
          id: channelId,
          videos: items,
        })
      }).catch((ex) => {
        console.log('parsing failed', ex)
      })
  }
}

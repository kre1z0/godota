import 'isomorphic-fetch'
import store from '../store/configureStore'

export function getNextVideos (nextPageToken, pid, vidResults) {
  const url = 'https://www.googleapis.com/youtube/v3/search?' +
    'maxResults=' + vidResults + '&' +
    'part=snippet&' +
    'channelId=' + pid + '&' +
    'order=date&' +
    'pageToken=' + nextPageToken + '&' +
    'key=AIzaSyB857qDfoTXwdCBaIFDqxEUD3j2W_hCMVg'
  fetch(url).then((response) => {
    return response.json()
  }).then((json) => {

    const youtube_json = json.items
    const next = json.nextPageToken
    const prev = json.prevPageToken
    const title = json.items[0].snippet.channelTitle
    const channelHref = json.items[0].snippet.channelId

    store.dispatch(
      {
        type: 'LOAD_YOUTUBE_VIDEO',
        nextPageToken: next,
        prevPageToken: prev,
        pid: pid,
        title: title,
        channelHref: 'https://www.youtube.com/channel/' + channelHref,
        vidResults: vidResults,
        video: youtube_json
      }
    )
  }).catch(function (ex) {
    console.log('parsing failed', ex)
  })
}

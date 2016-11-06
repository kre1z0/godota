import 'isomorphic-fetch'
import store from '../store/configureStore'

export function getNextVideos (nextPageToken, pid, maxResults, logo) {
  const url = 'https://www.googleapis.com/youtube/v3/search?' +
    'maxResults=' + maxResults + '&' +
    'part=snippet&' +
    'channelId=' + pid + '&' +
    'order=date&' +
    'pageToken=' + nextPageToken + '&' +
    'key=AIzaSyB857qDfoTXwdCBaIFDqxEUD3j2W_hCMVg'
  fetch(url).then((response) => {
    return response.json()
  }).then((json) => {

    const items = json.items
    const next = json.nextPageToken
    const prev = json.prevPageToken
    const title = json.items[0].snippet.channelTitle
    const channelHref = json.items[0].snippet.channelId

    store.dispatch([
        {
          type: 'LOAD_YOUTUBE_VIDEO',
          nextPageToken: next,
          prevPageToken: prev,
          pid: pid,
          vidResults: maxResults,
          video: items,
          channelHref: 'https://www.youtube.com/channel/' + channelHref,
          title: title
        },
        {
          type: 'LOAD_YOUTUBE_LOGO',
          logo: logo
        }
      ]
    )
  }).catch(function (ex) {
    console.log('parsing failed', ex)
  })
}

import store from '../store/configureStore'

export function getVideos (pid) {
  const vidResults = 8
  const url = 'https://www.googleapis.com/youtube/v3/search?' +
    'maxResults=' + vidResults + '&' +
    'part=snippet&' +
    'channelId=' + pid + '&' +
    'order=date&' +
    'key=AIzaSyB857qDfoTXwdCBaIFDqxEUD3j2W_hCMVg'
  fetch(url).then((response) => {
    return response.json()
  }).then((json) => {
    const youtube_json = json.items
    const pageToken = json.nextPageToken

    const all = []

    for (const id in youtube_json)
      { if (youtube_json.hasOwnProperty(id)) {
        all.push(youtube_json[id].id.videoId)
      } }

    const title = json.items[0].snippet.channelTitle
    const channelHref = json.items[0].Id

    store.dispatch(
      {
        type: 'LOAD_YOUTUBE_VIDEO',
        title: title,
        channelHref: 'https://www.youtube.com/channel/' + channelHref,
        nextPageToken: pageToken,
        pid: pid,
        vidResults: vidResults,
        video: youtube_json
      }
    )
  }).catch(function (ex) {
    console.log('parsing failed', ex)
  })
}


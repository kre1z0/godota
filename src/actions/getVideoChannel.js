import store from '../store/configureStore'

export function getVideoChannel (channelName, channelId) {
  if (channelName) {
    const url = 'https://www.googleapis.com/youtube/v3/channels?' +
      'part=snippet&' +
      'forUsername=' + channelName + '&' +
      'key=AIzaSyB857qDfoTXwdCBaIFDqxEUD3j2W_hCMVg'
    getId(url)
  } else {
    const url = 'https://www.googleapis.com/youtube/v3/channels?' +
      'part=snippet&' +
      'id=' + channelId + '&' +
      'key=AIzaSyB857qDfoTXwdCBaIFDqxEUD3j2W_hCMVg'
    getId(url)
  }
}

function getId (url) {
  fetch(url)
    .then(response => response.json())
    .then((json) => {
      const channelLogo = json.items[0].snippet.thumbnails.default.url
      const channelId = json.items[0].id
      getVideos(channelId, channelLogo)
    }).catch((ex) => {
      console.log('parsing failed', ex)
    })
}

function getVideos (channelId, channelLogo) {
  const maxResults = 7
  const url = 'https://www.googleapis.com/youtube/v3/search?' +
    'maxResults=' + maxResults + '&' +
    'part=snippet&' +
    'channelId=' + channelId + '&' +
    'order=date&' +
    'key=AIzaSyB857qDfoTXwdCBaIFDqxEUD3j2W_hCMVg'

  fetch(url)
    .then(response => response.json())
    .then((json) => {
      for (const item of json.items) {
        item.logo = channelLogo
      }
      const logo = json.items[0].logo
      const vidResults = 7
      const items = json.items
      const next = json.nextPageToken
      const title = json.items[0].snippet.channelTitle
      const channelHref = json.items[0].snippet.channelId

      store.dispatch([
        {
          type: 'LOAD_YOUTUBE_VIDEO',
          nextPageToken: next,
          title: title,
          vidResults: vidResults,
          pid: channelId,
          channelHref: 'https://www.youtube.com/channel/' + channelHref,
          video: items
        },
        {
          type: 'LOAD_YOUTUBE_LOGO',
          logo: logo
        }
      ])
    }).catch((ex) => {
      console.log('parsing failed', ex)
    })
}

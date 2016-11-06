import 'isomorphic-fetch'
import store from '../store/configureStore'

export function getYoutube () {
  return dispatch => Promise.all([
    dispatch(getYoutubeChannelsList()),
    dispatch(getChannelsVideos())
  ])
}

store.dispatch(getYoutube()).then(() => {

})

function getYoutubeChannelsList () {
  const url = './json/youtube.json'
  return dispatch =>
    fetch(url)
      .then(response => response.json())
      .then((json) => {
        json.sort(function (a, b) {
          if (a.name > b.name) {
            return 1;
          }
          if (a.name < b.name) {
            return -1;
          }
          return 0;
        })
        return dispatch({ type: 'YOUTUBE_CHANNEL_LIST', youtubeChannelsList: json })
      }).catch((error) => {
      return dispatch => ({ type: 'YOUTUBE_CHANNEL_LIST_ERROR', youtubeChannelsListError: error })
    })
}

function getChannelsVideos () {
  const url = './json/youtube.json'
  return dispatch =>
    fetch(url)
      .then(response => response.json())
      .then((json) => {

        let videos = getUrl(json)

        Promise.all(videos).then((videos) => {
          let flattened = videos.reduce((a, b) => {
            return a.concat(b)
          })
          return dispatch({ type: 'LOAD_YOUTUBE_VIDEO', video: flattened })
        })

      }).catch((error) => {
      console.log('error', error)
    })
}


export function getUrl (json) {
  return json.map((item) => {
    const channelName = item.id
    const channelId = item.youtubeId
    if (channelName) {
      const url = 'https://www.googleapis.com/youtube/v3/channels?' +
        'part=snippet&' +
        'forUsername=' + channelName + '&' +
        'key=AIzaSyB857qDfoTXwdCBaIFDqxEUD3j2W_hCMVg'
      return getId(url)
    } else {
      const url = 'https://www.googleapis.com/youtube/v3/channels?' +
        'part=snippet&' +
        'id=' + channelId + '&' +
        'key=AIzaSyB857qDfoTXwdCBaIFDqxEUD3j2W_hCMVg'
      return getId(url)
    }
  })
}


function getId (url) {
  return fetch(url)
    .then(response => response.json())
    .then((json) => {
      const channelLogo = json.items[0].snippet.thumbnails.default.url
      const channelId = json.items[0].id
      return getVideos(channelId, channelLogo)
    }).catch((ex) => {
      console.log('parsing failed', ex)
    })
}

function getVideos (channelId, channelLogo) {
  const maxResults = 10
  const url = 'https://www.googleapis.com/youtube/v3/search?' +
    'maxResults=' + maxResults + '&' +
    'part=snippet&' +
    'channelId=' + channelId + '&' +
    'order=date&' +
    'key=AIzaSyB857qDfoTXwdCBaIFDqxEUD3j2W_hCMVg'
  return fetch(url)
    .then(response => response.json())
    .then((json) => {

      for(const item of json.items) {
        item.logo =  channelLogo;
      }
      return json.items

    }).catch((ex) => {
      console.log('parsing failed', ex)
    })
}



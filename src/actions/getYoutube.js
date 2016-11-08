import 'isomorphic-fetch'
import store from '../store/configureStore'
import moment from 'moment' // http://momentjs.com/

export function getChannelsVideos (publishDate) {
  const url = './json/youtube.json'
  fetch(url)
    .then(response => response.json())
    .then((json) => {
      let videos = getUrl(json, publishDate)
      Promise.all(videos).then((videos) => {
        let flattened = videos.reduce((a, b) => {
          return a.concat(b)
        })
        flattened.sort((a, b) => {
          if (a.snippet.publishedAt > b.snippet.publishedAt) {
            return -1
          }
          if (a.snippet.publishedAt < b.snippet.publishedAt) {
            return 1
          }
          return 0
        })
        store.dispatch({ type: 'LOAD_YOUTUBE_VIDEO', video: flattened })
      })
    }).catch((error) => {
      console.log('error', error)
  })
}

function getUrl (json, publishDate) {
  return json.map((item) => {
    const channelName = item.id
    const channelId = item.youtubeId
    if (channelName) {
      const url = 'https://www.googleapis.com/youtube/v3/channels?' +
        'part=snippet&' +
        'forUsername=' + channelName + '&' +
        'key=AIzaSyB857qDfoTXwdCBaIFDqxEUD3j2W_hCMVg'
      return getId(url, publishDate)
    } else {
      const url = 'https://www.googleapis.com/youtube/v3/channels?' +
        'part=snippet&' +
        'id=' + channelId + '&' +
        'key=AIzaSyB857qDfoTXwdCBaIFDqxEUD3j2W_hCMVg'
      return getId(url, publishDate)
    }
  })
}

function getId (url, publishDate) {
  return fetch(url)
    .then(response => response.json())
    .then((json) => {
      const channelLogo = json.items[0].snippet.thumbnails.default.url
      const channelId = json.items[0].id
      return getVideos(channelId, channelLogo, publishDate)
    }).catch((ex) => {
      console.log('parsing failed', ex)
    })
}

function getVideos (channelId, channelLogo, publishDate) {
  const maxResults = 22
  const url = 'https://www.googleapis.com/youtube/v3/search?' +
    'maxResults=' + maxResults + '&' +
    'part=snippet&' +
    'channelId=' + channelId + '&' +
    'order=date&' +
    'key=AIzaSyB857qDfoTXwdCBaIFDqxEUD3j2W_hCMVg'
  return fetch(url)
    .then(response => response.json())
    .then((json) => {
      const videos = json.items
      for (const item of videos) {
        item.logo = channelLogo
      }
      return filterVideos(videos, publishDate)
    }).catch((ex) => {
      console.log('parsing failed', ex)
    })
}

function filterVideos (videos, publishDate) {

  return videos.filter(filterByPublishDate)

  function filterByPublishDate (obj) {

    const publishedAt = moment(obj.snippet.publishedAt)

    if (publishedAt.isSame(publishDate, 'd')) {
      return obj
    }
  }
}

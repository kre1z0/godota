import 'isomorphic-fetch'
import moment from 'moment' // http://momentjs.com/
import * as youtube from '../constants/youtube'
import { YOUTUBE_SORT_ACTIVE, LOAD_YOUTUBE_VIDEOS } from '../actions/youtube'

function filterVideos(videos, publishDate) {
  function filterByPublishDate(obj) {
    const publishedAt = moment(obj.snippet.publishedAt)

    if (publishedAt.isSame(publishDate, 'd')) {
      return obj
    }
  }

  return videos.filter(filterByPublishDate)
}

function getVideos(id, channelLogo, publishDate) {
  const resultAmount = 22
  const url = `${youtube.SEARCH_REQUEST}maxResults=${resultAmount}&channelId=${id}&order=date`
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

function getId(url, publishDate) {
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

function getUrl(json, publishDate) {
  return json.map((item) => {
    const channelName = item.id
    const channelId = item.youtubeId
    if (channelName) {
      const url = `${youtube.CHANNEL_REQUEST}&forUsername=${channelName}`
      return getId(url, publishDate)
    }
    const url = `${youtube.CHANNEL_REQUEST}&id=${channelId}`
    return getId(url, publishDate)
  })
}

export function getChannelsVideos(publishDate) {
  return (dispatch) => {
    const url = './static/json/youtube.json'
    fetch(url)
      .then(response => response.json())
      .then((json) => {
        const videos = getUrl(json, publishDate)
        Promise.all(videos).then((array) => {
          const flattened = array.reduce((a, b) => a.concat(b))
          flattened.sort((a, b) => {
            if (a.snippet.publishedAt > b.snippet.publishedAt) {
              return -1
            }
            if (a.snippet.publishedAt < b.snippet.publishedAt) {
              return 1
            }
            return 0
          })
          dispatch({
            type: YOUTUBE_SORT_ACTIVE,
            selected: true,
          })
          dispatch({
            type: LOAD_YOUTUBE_VIDEOS,
            videos: flattened,
          })
        })
      }).catch((error) => {
        console.log('error', error)
      })
  }
}

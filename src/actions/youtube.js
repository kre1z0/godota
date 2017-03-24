import 'isomorphic-fetch'
// ➡ https://github.com/fisshy/react-scroll
import Scroll from 'react-scroll'
import { LOAD_VIDEO, ACTIVE_VIDEO } from '../constants/basic'
import { SELECTED_TWITCH_STREAMER } from './twitch'
import { API_KEY, CHANNEL_REQUEST, SEARCH_REQUEST, NUMBER_OF_VIDEOS } from '../constants/youtube'

export const YOUTUBE_CHANNEL_LIST_REQUEST = 'YOUTUBE_CHANNEL_LIST_REQUEST'
export const YOUTUBE_CHANNEL_LIST_SUCCESS = 'YOUTUBE_CHANNEL_LIST_SUCCESS'
export const YOUTUBE_CHANNEL_LIST_ERROR = 'YOUTUBE_CHANNEL_LIST_ERROR'
export const SELECTED_YOUTUBE_CHANNEL = 'SELECTED_YOUTUBE_CHANNEL'

export const YOUTUBE_VIDEOS_REQUEST = 'YOUTUBE_VIDEOS_REQUEST'
export const YOUTUBE_VIDEOS_SUCCESS = 'YOUTUBE_VIDEOS_SUCCESS'
export const YOUTUBE_VIDEOS_ERROR = 'YOUTUBE_VIDEOS_ERROR'

export const LOAD_YOUTUBE_VIDEOS = 'LOAD_YOUTUBE_VIDEOS'
export const LOAD_YOUTUBE_LOGO_INFO = 'LOAD_YOUTUBE_LOGO_INFO'
export const YOUTUBE_SORT_ACTIVE = 'YOUTUBE_SORT_ACTIVE'

export const GET_CHANNEL = 'GET_CHANNEL'

export function getYoutubeChannelsList() {
  return (dispatch) => {
    dispatch({ type: YOUTUBE_CHANNEL_LIST_REQUEST })
    const url = './static/json/youtube.json'
    fetch(url)
      .then(response => response.json())
      .then((data) => {
        data.sort((a, b) => {
          if (a.name > b.name) {
            return 1
          }
          if (a.name < b.name) {
            return -1
          }
          return 0
        })
        dispatch({ type: YOUTUBE_CHANNEL_LIST_SUCCESS, channels_list: data })
      }).catch((errors) => {
        dispatch({ type: YOUTUBE_CHANNEL_LIST_ERROR, error: errors })
      })
  }
}

function returnUrlForChannel(channel) {
  let url
  if (channel.id !== undefined) {
    const byName = `${CHANNEL_REQUEST}forUsername=${channel.id}&key=${API_KEY}`
    url = byName
  }
  if (channel.youtubeId !== undefined) {
    const byId = `${CHANNEL_REQUEST}id=${channel.youtubeId}&key=${API_KEY}`
    url = byId
  }
  return fetch(url)
    .then(response => response.json())
    .then((channelData) => {
      console.log('channelData', channelData)
      const object = {
        id: channelData.items[0].id,
        logo: channelData.items[0].snippet.thumbnails.default.url,
      }
      return object
    }).catch((error) => {
      console.log('returnUrlForChannel parsing failed', error)
    })
}

export function getYoutubeVideosFromChannel(channel) {
  return (dispatch) => {
    dispatch({ type: YOUTUBE_VIDEOS_REQUEST })
    returnUrlForChannel(channel).then((object) => {
      const channelId = object.id
      const channelLogo = object.logo
      const url = `${SEARCH_REQUEST}maxResults=${NUMBER_OF_VIDEOS}&channelId=${channelId}&order=date`
      fetch(url)
        .then(response => response.json())
        .then((videos) => {
          dispatch({
            type: LOAD_YOUTUBE_VIDEOS,
            channelId: {
              id: channel.id,
              youtubeId: channel.youtubeId,
            },
            id: channelId,
            videos: videos.items,
            prevPageToken: videos.prevPageToken,
            nextPageToken: videos.nextPageToken,
          })
          dispatch({
            type: LOAD_YOUTUBE_LOGO_INFO,
            channel_url: videos.items[0].snippet.channelId,
            logo: channelLogo,
          })
          dispatch({
            type: YOUTUBE_SORT_ACTIVE,
            selected: false,
          })
        }).catch((error) => {
          console.log('parsing failed 2', error)
        })
    }).catch((error) => {
      console.log('Promise all parsing failed', error)
    })
  }
}

export function loadVideo(video) {
  Scroll.animateScroll.scrollTo(100)
  return (dispatch) => {
    const videoId = video.id.videoId
    const url = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`
    dispatch({
      type: LOAD_VIDEO,
      video: url,
    })
    dispatch({
      type: ACTIVE_VIDEO,
      active: true,
    })
    dispatch({
      type: SELECTED_YOUTUBE_CHANNEL,
      active: true,
    })
    dispatch({
      type: SELECTED_TWITCH_STREAMER,
      selected: false,
    })
  }
}

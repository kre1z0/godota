import 'isomorphic-fetch'
import { apiKey, channelRequest, searchRequest } from '../constants/youtube'

export const YOUTUBE_CHANNEL_LIST_REQUEST = 'YOUTUBE_CHANNEL_LIST_REQUEST'
export const YOUTUBE_CHANNEL_LIST_SUCCESS = 'YOUTUBE_CHANNEL_LIST_SUCCESS'
export const YOUTUBE_CHANNEL_LIST_ERROR = 'YOUTUBE_CHANNEL_LIST_ERROR'
export const SELECTED_YOUTUBE_CHANNEL = 'SELECTED_YOUTUBE_CHANNEL'

export const YOUTUBE_VIDEOS_REQUEST = 'YOUTUBE_VIDEOS_REQUEST'
export const YOUTUBE_VIDEOS_SUCCESS = 'YOUTUBE_VIDEOS_SUCCESS'
export const YOUTUBE_VIDEOS_ERROR = 'YOUTUBE_VIDEOS_ERROR'

export const GET_CHANNEL = 'GET_CHANNEL'

export function getYoutubeChannelsList() {
  return (dispatch) => {
    dispatch({ type: YOUTUBE_CHANNEL_LIST_REQUEST })
    const url = './json/youtube.json'
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
        dispatch({ type: YOUTUBE_CHANNEL_LIST_SUCCESS, youtubeChannelsList: data })
      }).catch((error) => {
        dispatch({ type: YOUTUBE_CHANNEL_LIST_ERROR, youtubeChannelsListError: error })
      })
  }
}

function getVideos(url) {
  return dispatch =>
    fetch(url)
      .then(response => response.json())
      .then((data) => {
        dispatch({ type: YOUTUBE_VIDEOS_SUCCESS, videos: data.items })
        // for (const item of json.items) {
        //   item.logo = channelLogo
        // }
        // const logo = json.items[0].logo
        // const vidResults = 15
        // const items = json.items
        // const next = json.nextPageToken
        // const title = json.items[0].snippet.channelTitle
        // const channelHref = json.items[0].snippet.channelId

        // store.dispatch([
        //   {
        //     type: 'LOAD_YOUTUBE_VIDEO',
        //     nextPageToken: next,
        //     title: title,
        //     vidResults: vidResults,
        //     pid: channelId,
        //     channelHref: 'https://www.youtube.com/channel/' + channelHref,
        //     video: items
        //   },
        //   {
        //     type: 'LOAD_YOUTUBE_LOGO',
        //     logo: logo,
        //   },
        // ])
      }).catch((error) => {
        console.log('parsing failed', error)
      })
}


function getVideos(url) {
  return dispatch =>
    fetch(url)
      .then(response => response.json())
      .then(json => dispatch({ type: YOUTUBE_VIDEOS_SUCCESS, json }),
        err => dispatch({ type: YOUTUBE_VIDEOS_ERROR, err }),
      )
}

function getChannel(url) {
  return fetch(url)
    .then(response => response.json())
    .then((json) => {
      return json
      // console.log('data', json)
      // const maxResults = 15
      // const channelId = json.items[0].id
      // const searchUrl = `${searchRequest}maxResults=${maxResults}&channelId=${channelId}&order=date&key=${apiKey}`
      // dispatch({ type: 'getChannel', data: json })
    }).catch((error) => {
      console.log('parsing failed', error)
    })
}

export function getYoutubeVideosFromChannel(channel) {
  return (dispatch) => {
    // dispatch({ type: YOUTUBE_VIDEOS_REQUEST })
    let url
    if (channel.id) {
      const byName = `${channelRequest}forUsername=${channel.id}&key=${apiKey}`
      url = byName
    }
    if (channel.youtubeId) {
      const byId = `${channelRequest}id=${channel.youtubeId}&key=${apiKey}`
      url = byId
    }
    fetch(url)
      .then(response => response.json())
      .then((json) => {
        const maxResults = 15
        const channelId = json.items[0].id
        const searchUrl = `${searchRequest}maxResults=${maxResults}&channelId=${channelId}&order=date&key=${apiKey}`
        fetch(searchUrl)
          .then(response => response.json())
          .then((data) => {
            dispatch({ type: YOUTUBE_VIDEOS_SUCCESS, videos: data.items })
            // for (const item of json.items) {
            //   item.logo = channelLogo
            // }
            // const logo = json.items[0].logo
            // const vidResults = 15
            // const items = json.items
            // const next = json.nextPageToken
            // const title = json.items[0].snippet.channelTitle
            // const channelHref = json.items[0].snippet.channelId

            // store.dispatch([
            //   {
            //     type: 'LOAD_YOUTUBE_VIDEO',
            //     nextPageToken: next,
            //     title: title,
            //     vidResults: vidResults,
            //     pid: channelId,
            //     channelHref: 'https://www.youtube.com/channel/' + channelHref,
            //     video: items
            //   },
            //   {
            //     type: 'LOAD_YOUTUBE_LOGO',
            //     logo: logo,
            //   },
            // ])
          }).catch((error) => {
            console.log('parsing failed', error)
          })
      }).catch((error) => {
        console.log('parsing failed', error)
      })
  }
}


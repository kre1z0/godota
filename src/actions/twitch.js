import fetch from 'isomorphic-fetch'
import moment from 'moment'
import { LOAD_VIDEO, ACTIVE_VIDEO } from '../constants/basic'
import { SELECTED_YOUTUBE_CHANNEL } from './youtube'

export const LOAD_TWITCH_REQUEST = 'LOAD_TWITCH_REQUEST'
export const LOAD_TWITCH_SUCCESS = 'LOAD_TWITCH_SUCCESS'
export const LOAD_TWITCH_ERROR = 'LOAD_TWITCH_ERROR'
export const LOAD_TWITCH_IMAGE = 'LOAD_TWITCH_IMAGE'
export const HIDE_TWITCH_IMAGE = 'HIDE_TWITCH_IMAGE'
export const TWITCH_IMAGE_LOADER = 'TWITCH_IMAGE_LOADER'
export const LOAD_TWITCH_CHAT = 'LOAD_TWITCH_STREAM'
export const SELECTED_TWITCH_STREAMER = 'SELECTED_TWITCH_STREAMER'

export function getStreamerList() {
  return (dispatch) => {
    fetch('./static/json/twitch.json').then(response => response.json())
      .then((twitch) => {
        const all = []

        for (const name in twitch) {
          if (twitch[name]) {
            all.push(twitch[name].id)
          }
        }
        const allStreamers = all.join()
        const url = `https://api.twitch.tv/kraken/streams?channel=${allStreamers}?callback=JSON_CALLBACK`
        dispatch({
          type: LOAD_TWITCH_REQUEST,
        })
        fetch(url, {
          headers: {
            'Client-ID': 'pwv7i6ch787xuonmdgskoi2b3vrfa0t',
          },
        }).then(response => response.json()).then((json) => {
          const list = json.streams

          function isGameDota(obj) {
            return obj.game === 'Dota 2'
          }

          const onlyDota2 = list.filter(isGameDota)

          list.map((item) => {
            const arr = twitch.find(equal => (item.channel.name === equal.id))
            if (arr) {
              item.channel = Object.assign(item.channel, arr)
            }
            return arr
          })
          dispatch({
            type: LOAD_TWITCH_SUCCESS,
            twitch: onlyDota2,
          })
        }).catch((error) => {
          console.log('parsing failed', error)
          dispatch({
            type: LOAD_TWITCH_ERROR,
          })
        })
      }).catch((error) => {
        console.log('parsing failed', error)
      })
  }
}

export function loadTwitchImage(item) {
  return (dispatch) => {
    const dateTime = item.created_at
    const formattedDT = moment(dateTime).startOf('hour').fromNow()
    const w = document.getElementById('videoFrame').getBoundingClientRect().width
    const h = w / 1.69
    const width = Math.floor(w)
    const height = Math.floor(h)
    const image = item.preview.template.replace('{width}', width).replace('{height}', height)
    dispatch(
      {
        type: LOAD_TWITCH_IMAGE,
        image: {
          url: image,
          date: formattedDT,
        },
      },
    )
    dispatch({
      type: ACTIVE_VIDEO,
      active: true,
    })
    dispatch(
      {
        type: SELECTED_TWITCH_STREAMER,
        selected: true,
      },
    )
  }
}

export function twitchImageLoader(loader) {
  return (dispatch) => {
    dispatch(
      {
        type: TWITCH_IMAGE_LOADER,
        loader: !loader,
      },
    )
  }
}

export function hideTwitchImage(imageIsVisible) {
  return (dispatch) => {
    dispatch(
      {
        type: HIDE_TWITCH_IMAGE,
        imageIsVisible: !imageIsVisible,
      },
    )
    dispatch({
      type: ACTIVE_VIDEO,
      active: false,
    })
  }
}

export function loadStreamer(streamer) {
  return (dispatch) => {
    const channelName = streamer.channel.name
    const urlVideo = `https://player.twitch.tv/?channel=${channelName}`
    const urlChat = `https://www.twitch.tv/${channelName}/chat?popout=`
    dispatch(
      {
        type: LOAD_TWITCH_CHAT,
        chat: urlChat,
      },
    )
    dispatch(
      {
        type: LOAD_VIDEO,
        video: urlVideo,
      },
    )
    dispatch(
      {
        type: ACTIVE_VIDEO,
        active: true,
      },
    )
    dispatch(
      {
        type: SELECTED_TWITCH_STREAMER,
        selected: true,
      },
    )
    dispatch(
      {
        type: SELECTED_YOUTUBE_CHANNEL,
        active: false,
      },
    )
  }
}
import 'isomorphic-fetch'
import { getVideos } from '../actions/youtubeGetVideos'

export function getChannelId (channelName, channelId) {
  if (channelName) {
    const url = 'https://www.googleapis.com/youtube/v3/channels?' +
      'part=contentDetails&' +
      'forUsername=' + channelName + '&' +
      'key=AIzaSyB857qDfoTXwdCBaIFDqxEUD3j2W_hCMVg'

    makeFetch(url)
  }
  if (channelId) {
    const url = 'https://www.googleapis.com/youtube/v3/channels?' +
      'part=contentDetails&' +
      'id=' + channelId + '&' +
      'key=AIzaSyB857qDfoTXwdCBaIFDqxEUD3j2W_hCMVg'

    makeFetch(url)
  }
}

function makeFetch (url) {
  fetch(url).then((response) => {
    return response.json()
  }).then((json) => {
    const pid = json.items[0].id
    getVideos(pid)
  }).catch(function (ex) {
    console.log('parsing failed', ex)
  })
}

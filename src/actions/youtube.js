import 'isomorphic-fetch'
import store from '../store/configureStore'


export function getYoutube () {
  return dispatch => Promise.all([
    dispatch(getYoutubeChannelsList()),
    dispatch(getChannelsNames())
  ])
}

store.dispatch(getYoutube()).then(() => {
  console.log('I did everything!');
});

function getYoutubeChannelsList () {
  return dispatch =>
    fetch(
      './json/youtube.json'
    ).then((response) => {
      return response.json()
    }).then((json) => {
      return dispatch({ type: 'YOUTUBE_CHANNEL_LIST', youtubeChannelsList: json })
    }).catch((error) => {
      return dispatch({ type: 'YOUTUBE_CHANNEL_LIST_ERROR', youtubeChannelsListError: error })
    })
}


function getChannelsNames () {
  return dispatch =>
    fetch(
      './json/youtube.json'
    ).then((response) => {
      return response.json()
    }).then((json) => {
      let array = []
      json.map((item) => {
        const channelName = item.id
        const channelId = item.youtubeId
        if (channelName) {
          const url = 'https://www.googleapis.com/youtube/v3/channels?' +
            'part=contentDetails&' +
            'forUsername=' + channelName + '&' +
            'key=AIzaSyB857qDfoTXwdCBaIFDqxEUD3j2W_hCMVg'
          getId(url)
        } else {
          const url = 'https://www.googleapis.com/youtube/v3/channels?' +
            'part=contentDetails&' +
            'id=' + channelId + '&' +
            'key=AIzaSyB857qDfoTXwdCBaIFDqxEUD3j2W_hCMVg'
          getId(url)
        }
      })
      function getId (url) {
        fetch(url).then((response) => {
          return response.json()
        }).then((json) => {
          const item = json.items[0].id
          getVideos(item)
        }).catch(function (ex) {
          console.log('parsing failed', ex)
        })
      }

      function getVideos (pid) {
        const vidResults = 1
        const url = 'https://www.googleapis.com/youtube/v3/search?' +
          'maxResults=' + vidResults + '&' +
          'part=snippet&' +
          'channelId=' + pid + '&' +
          'order=date&' +
          'key=AIzaSyB857qDfoTXwdCBaIFDqxEUD3j2W_hCMVg'

        fetch(url).then((response) => {
          return response.json()
        }).then((json) => {
          const items = json.items
          items.map((item) => {
            array.push(item)
          })
        }).catch(function (ex) {
          console.log('parsing failed', ex)
        })
      }

      return dispatch({ type: 'YOUTUBE_VIDEO', video: array })
    }).catch((error) => {
      console.log('error', error)
    })
}


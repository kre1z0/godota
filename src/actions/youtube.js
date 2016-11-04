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

// let channelNames = getChannelsNames(json)
// console.log('getChannelsNames', channelNames)
// let channelIDs = getChannelsIDs(channelNames)
// console.log('channelIDs', channelIDs)
// let channelsVideo = getChannelsVideo(channelIDs)
// console.log('I did everything!', channelsVideo)


function getChannelsNames (json) {

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
          array.push({
            name: channelName
          })
        } else {
          array.push({
            id: channelId
          })
        }
      })
      return dispatch({ type: 'ggwp', tt: array })
    }).catch((error) => {
      console.log('error', error)
    })

}

function getChannelsIDs (channelNames) {
  let array = []
  console.log(channelNames)
  channelNames.map((item)=> {
    if (item.name) {
      const url = 'https://www.googleapis.com/youtube/v3/channels?' +
        'part=contentDetails&' +
        'forUsername=' + item.name + '&' +
        'key=AIzaSyB857qDfoTXwdCBaIFDqxEUD3j2W_hCMVg'
      getId(url)
    } else {
      const url = 'https://www.googleapis.com/youtube/v3/channels?' +
        'part=contentDetails&' +
        'id=' + item.id + '&' +
        'key=AIzaSyB857qDfoTXwdCBaIFDqxEUD3j2W_hCMVg'
      getId(url)
    }
  })
  function getId (url) {
    fetch(url).then((response) => {
      return response.json()
    }).then((json) => {
      const item = json.items[0].id
      array.push(item)
      // getVideos(item)
    }).catch(function (ex) {
      console.log('parsing failed', ex)
    })
  }

  return array
}

function getChannelsVideo (channelIDs) {

  let array = []

  const videoResults = 4
  console.log('ggdvfdgdfgdf', channelIDs)
  channelIDs.map((item) => {
    const url = 'https://www.googleapis.com/youtube/v3/search?' +
      'maxResults=' + videoResults + '&' +
      'part=snippet&' +
      'channelId=' + item + '&' +
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
  })
  return array
}

// **************************************************************
function getAllVideo () {
  let promises = []
  fetch(
    './json/youtube.json'
  ).then(
    response => response.json()
  ).then((json) => {
      json.map((item) => {
        const channelName = item.id
        const channelId = item.youtubeId
        getChannelsId(channelName, channelId)
      })
    }
  )
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
        promises.push(item)
      })
    }).catch(function (ex) {
      console.log('parsing failed', ex)
    })
  }

  store.dispatch({
    type: 'LOAD_YOUTUBE_VIDEO',
    video: promises
  })
}

// store.dispatch(getYoutubeChannelsList()).then((obj) => {
//   obj.youtube.forEach((item) => {
//     const channelName = item.id
//     const channelId = item.youtubeId
//     tt(channelName, channelId)
//   })
// })


// store.dispatch(
//   {
//     type: 'LOAD_YOUTUBE_VIDEO',
//     video: AllVideoItem
//   }
// )


// Promise.all([
//   store.dispatch(getYoutubeChannelsList()),
// ]).then((youtube) => {
//   console.log('youtube', youtube)
//   youtube[0].youtube.forEach((item) => {
//     const channelName = item.id
//     const channelId = item.youtubeId
//     getAllVIDEO(channelName, channelId)
//   })
// });

// function tt (channelName, channelId) {
//
//   if (channelName) {
//     const url = 'https://www.googleapis.com/youtube/v3/channels?' +
//       'part=contentDetails&' +
//       'forUsername=' + channelName + '&' +
//       'key=AIzaSyB857qDfoTXwdCBaIFDqxEUD3j2W_hCMVg'
//     getId(url)
//   }
//
//   if (channelId) {
//     const url = 'https://www.googleapis.com/youtube/v3/channels?' +
//       'part=contentDetails&' +
//       'id=' + channelId + '&' +
//       'key=AIzaSyB857qDfoTXwdCBaIFDqxEUD3j2W_hCMVg'
//     getId(url)
//   }
//
//   function getId (url) {
//
//     fetch(url).then((response) => {
//       return response.json()
//     }).then((json) => {
//       const item = json.items[0].id
//       getVideos(item)
//     }).catch(function (ex) {
//       console.log('parsing failed', ex)
//     })
//   }
// }
//
// let AllVideoItem = []
//
// function getVideos (pid) {
//   const vidResults = 8
//   const url = 'https://www.googleapis.com/youtube/v3/search?' +
//     'maxResults=' + vidResults + '&' +
//     'part=snippet&' +
//     'channelId=' + pid + '&' +
//     'order=date&' +
//     'key=AIzaSyB857qDfoTXwdCBaIFDqxEUD3j2W_hCMVg'
//
//   fetch(url).then((response) => {
//     return response.json()
//   }).then((json) => {
//     const items = json.items
//     for (let i of items) {
//       AllVideoItem.push(i)
//     }
//   }).catch(function (ex) {
//     console.log('parsing failed', ex)
//   })
// }
//
// Promise.all(AllVideoItem).then(() => {
//
//   store.dispatch(
//     {
//       type: 'LOAD_YOUTUBE_VIDEO',
//       video: AllVideoItem
//     }
//   )
// });
//
// console.log('gg!', AllVideoItem)


// let idCollection = []
//
//
// function getYoutube (channelName, channelId) {
//
//   if (channelName) {
//     const url = 'https://www.googleapis.com/youtube/v3/channels?' +
//       'part=contentDetails&' +
//       'forUsername=' + channelName + '&' +
//       'key=AIzaSyB857qDfoTXwdCBaIFDqxEUD3j2W_hCMVg'
//     getId(url)
//   }
//
//   if (channelId) {
//     const url = 'https://www.googleapis.com/youtube/v3/channels?' +
//       'part=contentDetails&' +
//       'id=' + channelId + '&' +
//       'key=AIzaSyB857qDfoTXwdCBaIFDqxEUD3j2W_hCMVg'
//     getId(url)
//   }
//
//   function getId (url) {
//
//     fetch(url).then((response) => {
//       return response.json()
//     }).then((json) => {
//       const item = json.items[0].id
//       idCollection.push(item)
//     }).catch(function (ex) {
//       console.log('parsing failed', ex)
//     })
//   }
// }

// function getVideos (pid) {
//   const vidResults = 8
//   const url = 'https://www.googleapis.com/youtube/v3/search?' +
//     'maxResults=' + vidResults + '&' +
//     'part=snippet&' +
//     'channelId=' + pid + '&' +
//     'order=date&' +
//     'key=AIzaSyB857qDfoTXwdCBaIFDqxEUD3j2W_hCMVg'
//
//   fetch(url).then((response) => {
//     return response.json()
//   }).then((json) => {
//
//     const youtube = json.items
//     const pageToken = json.nextPageToken
//
//     const all = []
//
//     for (const id in youtube) {
//       if (youtube.hasOwnProperty(id)) {
//         all.push(youtube[id].id.videoId)
//       }
//     }
//
//     const title = json.items[0].snippet.channelTitle
//     const channelHref = json.items[0].Id
//
//     store.dispatch(
//       {
//         type: 'LOAD_YOUTUBE_VIDEO',
//         title: title,
//         channelHref: 'https://www.youtube.com/channel/' + channelHref,
//         nextPageToken: pageToken,
//         pid: pid,
//         vidResults: vidResults,
//         video: youtube
//       }
//     )
//   }).catch(function (ex) {
//     console.log('parsing failed', ex)
//   })
// }

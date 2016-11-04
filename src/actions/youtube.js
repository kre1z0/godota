import 'isomorphic-fetch'
import store from '../store/configureStore'

export function doList () {
  return dispatch => Promise.all([
    dispatch(getYoutubeChannelsList()),
  ]);
}

store.dispatch(doList()).then((json) => {
  console.log('doList', json)
});

function getYoutubeChannelsList () {
  return dispatch =>
    fetch(
      './json/youtube.json'
    ).then(
      response => response.json()
    ).then(
      json => dispatch({
        type: 'LOAD_YOUTUBE_LIST',
        youtube: json
      }),
      err => dispatch({ type: 'YOUTUBE_LIST_FAILED', err })
    );
}

// **************************************************************

export function doVideo () {
  return dispatch => Promise.all([
    dispatch(getAllVideo()),
  ]);
}

store.dispatch(doVideo()).then((json) => {
  console.log('doVideo', json)
});


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
  function getChannelsId (channelName, channelId) {
    if (channelName) {
      const url = 'https://www.googleapis.com/youtube/v3/channels?' +
        'part=contentDetails&' +
        'forUsername=' + channelName + '&' +
        'key=AIzaSyB857qDfoTXwdCBaIFDqxEUD3j2W_hCMVg'
      getId(url)
    }
    if (channelId) {
      const url = 'https://www.googleapis.com/youtube/v3/channels?' +
        'part=contentDetails&' +
        'id=' + channelId + '&' +
        'key=AIzaSyB857qDfoTXwdCBaIFDqxEUD3j2W_hCMVg'
      getId(url)
    }
  }
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
        promises.push(item)
      })
    }).catch(function (ex) {
      console.log('parsing failed', ex)
    })
  }
  return dispatch => Promise.all(promises).then(() => {
    return dispatch({
      type: 'LOAD_YOUTUBE_VIDEO',
      video: promises
    })
  })
}


function hh () {

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

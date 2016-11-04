import 'isomorphic-fetch'
import store from '../store/configureStore'
import { getYoutube } from './youtube'

// export function getAllChannels (youtube) {
//   youtube.forEach((item) => {
//     const name = item.id
//     const id = item.youtubeId
//     const oneChannel = false
//     getYoutube(name, id, oneChannel)
//   })
// }

// export function getAll (youtube) {
//   let array = []
//   let idCollection = []
//
//   youtube.map((item) => {
//     const name = item.id
//     const id = item.youtubeId
//     if (name) {
//       array.push({
//         name: name
//       })
//     } else {
//       array.push({
//         id: id
//       })
//     }
//   })
//   array.map((item) => {
//     if (item.name) {
//       const url = 'https://www.googleapis.com/youtube/v3/channels?' +
//         'part=contentDetails&' +
//         'forUsername=' + item.name + '&' +
//         'key=AIzaSyB857qDfoTXwdCBaIFDqxEUD3j2W_hCMVg'
//       pp(url)
//     } else {
//       const url = 'https://www.googleapis.com/youtube/v3/channels?' +
//         'part=contentDetails&' +
//         'id=' + item.id + '&' +
//         'key=AIzaSyB857qDfoTXwdCBaIFDqxEUD3j2W_hCMVg'
//       pp(url)
//     }
//   })
//   function pp (url) {
//     fetch(url).then((response) => {
//       return response.json()
//     }).then((json) => {
//       const item = json.items[0].id
//       idCollection.push(item)
//     }).catch(function (ex) {
//       console.log('parsing failed', ex)
//     })
//   }
//   store.dispatch(
//     {
//       type: 'YOUTUBE_CHANNELS_ID',
//       id: idCollection
//     }
//   )
// }

// ************************************************
// export function getAll (youtube) {
//   youtube.forEach((item) => {
//     const name = item.id
//     const id = item.youtubeId
//     gg(name, id)
//   })
// }
// function gg (channelName, channelId) {
//   if (channelName) {
//     const url = 'https://www.googleapis.com/youtube/v3/channels?' +
//       'part=contentDetails&' +
//       'forUsername=' + channelName + '&' +
//       'key=AIzaSyB857qDfoTXwdCBaIFDqxEUD3j2W_hCMVg'
//     bb(url)
//   }
//   if (channelId) {
//     const url = 'https://www.googleapis.com/youtube/v3/channels?' +
//       'part=contentDetails&' +
//       'id=' + channelId + '&' +
//       'key=AIzaSyB857qDfoTXwdCBaIFDqxEUD3j2W_hCMVg'
//     bb(url)
//   }
//
//   function bb (url) {
//     fetch(url).then((response) => {
//       return response.json()
//     }).then((json) => {
//       const item = json.items[0].id
//       tt(item)
//     }).catch(function (ex) {
//       console.log('parsing failed', ex)
//     })
//   }
//
// }

// var AllVideoItem = []
//
// function tt (pid) {
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
//   console.log('ggwp no re !')
//   store.dispatch(
//     {
//       type: 'LOAD_YOUTUBE_VIDEO',
//       video: AllVideoItem
//     }
//   )
// });





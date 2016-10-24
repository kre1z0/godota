import store from '../store/configureStore'
import moment from 'moment'

export function resizeTwitchIframe () {
  const w = document.getElementById('videoFrame').getBoundingClientRect().width
  const h = w / 1.69
  const width = Math.floor(w)
  const height = Math.floor(h)
  store.dispatch(
    {
      type: 'VIDEO_RESIZE',
      windowWidth: width,
      windowHeight: height
    }
  )
}

export function resizeTwitchImage (item) {
  const dateTime = item.created_at
  const formattedDT = moment(dateTime).startOf('hour').fromNow()
  const w = document.getElementById('videoFrame').getBoundingClientRect().width
  const h = w / 1.69
  const width = Math.floor(w)
  const height = Math.floor(h)
  const image = item.preview.template
  const img = image.replace('{width}', width).replace('{height}', height)

  store.dispatch(
    {
      type: 'LOAD_IMG',
      img: img,
      date: formattedDT,
      display: 'inline-block'
    }
  )
}

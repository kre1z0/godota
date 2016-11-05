import React, { Component, PropTypes } from 'react'
import './youtubeVideo.scss'
import store from '../store/configureStore'
import { connect } from 'react-redux'
import moment from 'moment'
import { getYoutube } from '../actions/getYoutube'
import YoutubeVideoNav from '../components/YoutubeNav'

@connect((store) => {
  return {
    video: store.Youtube.video,
    active: store.Youtube.active
  }
})
class YoutubeVideo extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedIndex: []
    }
  }

  componentWillMount () {
    getYoutube()
  }

  handleClick (item) {

    const videoId = item.id.videoId
    const channelHref = item.snippet.channelId
    const title = item.snippet.channelTitle
    this.setState({ selectedIndex: videoId })
    const url = 'https://www.youtube-nocookie.com/embed/' + videoId + '?autoplay=1'
    store.dispatch([
        {
          type: 'LOAD_STREAM',
          video: url,
          display: 'none',
          active: ''
        },
        {
          type: 'LOAD_YOUTUBE_TITLE',
          channelHref: 'https://www.youtube.com/channel/' + channelHref,
          title: title
        },
        {
          type: 'LOAD_YOUTUBE_ACTIVE',
          active: 'active'
        },
      ]
    )
  }

  static propTypes = {
    video: PropTypes.array,
    active: PropTypes.string
  }

  render () {
    let video
    if (this.props.video) {
      video = this.props.video.map((item) => {
        const dateTime = item.snippet.publishedAt
        const formattedDT = moment(dateTime).startOf('hour').fromNow()
        return (
          <div className='item'
            onClick={() => this.handleClick(item)}
            key={item.etag} >
            <div className={(this.state.selectedIndex === item.id.videoId) && this.props.active} >
              <div className='block-style' >
                <span className='youtube-title' >{item.snippet.title}</span>
                <img src={item.snippet.thumbnails.medium.url} />
                <span className='youtube-date' >{formattedDT}</span>
              </div>
            </div>
          </div>
        )
      })
    }
    return (
      <div className='youtube-video-list' >
        <YoutubeVideoNav />
        {video}
      </div>
    )
  }
}

export default YoutubeVideo

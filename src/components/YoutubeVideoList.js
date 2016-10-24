import React from 'react'
import store from '../store/configureStore'
import './_youtube-video-list.scss'
import { connect } from 'react-redux'
import moment from 'moment'

@connect((store) => {
  return {
    video: store.Youtube.video,
    active: store.Youtube.active
  }
})
export default class Streams extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedIndex: []
    }
  }

  static propTypes = {
    video: React.PropTypes.array
  };

  handleClick (item) {
    const videoId = item.id.videoId
    const title = item.snippet.title
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
        type: 'LOAD_YOUTUBE_ACTIVE',
        active: 'active'
      },
      {
        type: 'LOAD_YOUTUBE_VIDEO_TITLE',
        videoTitle: title
      }
    ]
    )
  }

  render () {
    let video
    if (this.props.video) {
      video = this.props.video.map((item) => {
        const dateTime = item.snippet.publishedAt
        const formattedDT = moment(dateTime).startOf('hour').fromNow()

        return (
          <div className='item'
            onClick={this.handleClick.bind(this, item)}
            key={item.id.videoId}>
            <div className={(this.state.selectedIndex === item.id.videoId) && this.props.active}>
              <div className='block-style'>
                <span className='youtube-title'>{item.snippet.title}</span>
                <img src={item.snippet.thumbnails.medium.url} />
                <span className='youtube-date'>{formattedDT}</span>
              </div>
            </div>
          </div>
        )
      })
    }
    return (
      <div className='youtube-video-list'>
        {video}
      </div>
    )
  }
}

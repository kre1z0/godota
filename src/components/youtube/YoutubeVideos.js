import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
// ➡ https://facebook.github.io/react/docs/animation.html
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import moment from 'moment' // http://momentjs.com/
import classNames from 'classnames'
import { loadVideo } from '../../actions/youtube'
import YoutubeVideoNav from './YoutubeNav'

class YoutubeVideo extends Component {
  static propTypes = {
    videos: PropTypes.array,
    active: PropTypes.bool,
    loadVideo: PropTypes.func,
  }
  constructor(props) {
    super(props)
    this.state = {
      selectedIndex: [],
    }
    this.onClickVideo = this.onClickVideo.bind(this)
  }
  onClickVideo(item) {
    const videoId = item.id.videoId
    this.setState({
      selectedIndex: videoId,
    })
    this.props.loadVideo(item)
  }
  render() {
    let videos
    if (Array.isArray(this.props.videos)) {
      videos = this.props.videos.map((item) => {
        if (item !== undefined) {
          const dateTime = item.snippet.publishedAt
          const formattedDT = moment(dateTime).startOf('hour').fromNow()
          const active = classNames({ active:
          (this.state.selectedIndex === item.id.videoId) && this.props.active === true })
          return (
            <div className='item' key={item.etag}
              title={item.snippet.title}
              onClick={() => this.onClickVideo(item)}
            >
              <div className={active} >
                <div className='block-style' >
                  <span className='youtube-title' >{item.snippet.title}</span>
                  <img src={item.snippet.thumbnails.medium.url} alt='' />
                  <span className='youtube-date' >{formattedDT}</span>
                </div>
              </div>
            </div>
          )
        }
        return null
      })
    }
    return (
      <ReactCSSTransitionGroup
        className='youtube-video-list'
        transitionName='example'
        transitionEnterTimeout={1500}
        transitionLeaveTimeout={1}
      >
        <YoutubeVideoNav />
        {videos}
      </ReactCSSTransitionGroup>
    )
  }
}

export default connect(state => ({
  videos: state.Youtube.videos,
  active: state.Youtube.active,
}),
  { loadVideo },
)(YoutubeVideo)

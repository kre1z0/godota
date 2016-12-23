import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
// ➡ https://facebook.github.io/react/docs/animation.html
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import moment from 'moment' // http://momentjs.com/
import { loadVideo } from '../../actions/youtube'
import YoutubeVideoNav from './YoutubeNav'

class YoutubeVideo extends Component {
  static propTypes = {
    videos: PropTypes.array,
    active: PropTypes.string,
    loadVideo: PropTypes.func,
  }
  constructor(props) {
    super(props)
    this.state = {
      selectedIndex: [],
    }
  }
  render() {
    return (
      <ReactCSSTransitionGroup
        className='youtube-video-list'
        transitionName='example'
        transitionEnterTimeout={1300}
        transitionLeaveTimeout={1}
      >
        <YoutubeVideoNav />
        {
          this.props.videos.map((item) => {
            const dateTime = item.snippet.publishedAt
            const formattedDT = moment(dateTime).startOf('hour').fromNow()
            return (
              <div className='item' key={item.etag}
                onClick={() => this.props.loadVideo(item)}
              >
                <div className={(this.state.selectedIndex === item.id.videoId) && this.props.active} >
                  <div className='block-style' >
                    <span className='youtube-title' >{item.snippet.title}</span>
                    <img src={item.snippet.thumbnails.medium.url} alt='' />
                    <span className='youtube-date' >{formattedDT}</span>
                  </div>
                </div>
              </div>
            )
          })
        }
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

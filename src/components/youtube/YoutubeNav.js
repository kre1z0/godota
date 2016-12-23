import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { getNextVideos } from '../../actions/getNextVideos'
import store from '../../store/configureStore'

class YoutubeVideoNav extends Component {
  static propTypes = {
    prevPageToken: PropTypes.string,
    nextPageToken: PropTypes.string,
    title: PropTypes.string,
    channel_url: PropTypes.string,
    pid: PropTypes.string,
    vidResults: PropTypes.number,
    logo: PropTypes.string,
  }
  constructor(props) {
    super(props)
    this.onClicGetkPrevVideos = ::this.onClicGetkPrevVideos
    this.onClicGetkNextVideos = ::this.onClicGetkNextVideos
  }

  onClicGetkPrevVideos() {
    if (this.props.prevPageToken) {
      store.dispatch(
        {
          type: 'LOAD_YOUTUBE_VIDEO',
          video: getNextVideos(this.props.prevPageToken,
          this.props.pid, this.props.vidResults, this.props.logo),
        },
      )
    }
  }

  onClicGetkNextVideos() {
    if (this.props.nextPageToken) {
      store.dispatch(
        {
          type: 'LOAD_YOUTUBE_VIDEO',
          video: getNextVideos(this.props.nextPageToken,
            this.props.pid, this.props.vidResults, this.props.logo)
        }
      )
    }
  }

  render() {
    console.log('this.props', this.props)
    return (
      <div className='item youtube-video-nav' >
        <a href={`https://www.youtube.com/channel/${this.props.channel_url}`}
          target='_blank' rel='noopener noreferrer'
          className='title_youtube_channel block-style'
        >
          <img className='youtube-channel-logo' src={this.props.logo} alt='logo' />
          <p>{this.props.title}</p>
        </a>
        <div className='btn-grp' >
          <button className='prev' onClick={this.onClicGetkPrevVideos} >
            <i className='fa fa-arrow-left' aria-hidden='true' />
          </button>
          <button className='next' onClick={this.onClicGetkNextVideos} >
            <i className='fa fa-arrow-right' aria-hidden='true' />
          </button>
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({
    channelId: state.Youtube.channelId,
    videos: state.Youtube.videos,
    logo: state.Youtube.logo,
    channel_url: state.Youtube.channel_url,
    prevPageToken: state.Youtube.prevPageToken,
    nextPageToken: state.Youtube.nextPageToken,
    // pid: store.state.pid,
    // vidResults: state.Youtube.vidResults,
    // title: state.Youtube.title,
    // channelHref: state.Youtube.channelHref,
  }),
  { },
)(YoutubeVideoNav)

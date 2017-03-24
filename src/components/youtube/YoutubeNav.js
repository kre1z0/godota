import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { getNextVideos } from '../../actions/getNextVideos'

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
    this.onClicGetkPrevVideos = this.onClicGetkPrevVideos.bind(this)
    this.onClicGetkNextVideos = this.onClicGetkNextVideos.bind(this)
  }

  onClicGetkPrevVideos() {
    if (this.props.prevPageToken) {
      this.props.getNextVideos(this.props.prevPageToken, this.props.id)
    }
  }

  onClicGetkNextVideos() {
    if (this.props.nextPageToken) {
      this.props.getNextVideos(this.props.nextPageToken, this.props.id)
    }
  }

  render() {
    const logo = (
      <a href={`https://www.youtube.com/channel/${this.props.channel_url}`}
        target='_blank' rel='noopener noreferrer'
        className='title_youtube_channel block-style'
      >
        <img className='youtube-channel-logo' src={this.props.logo} alt='logo' />
      </a>
    )
    const prevButton = (<button className='prev' onClick={this.onClicGetkPrevVideos} >
      <i className='fa fa-arrow-left' aria-hidden='true' />
    </button>)

    const nextButton = (<button className='next' onClick={this.onClicGetkNextVideos} >
      <i className='fa fa-arrow-right' aria-hidden='true' />
    </button>)

    if (this.props.prevPageToken && this.props.nextPageToken) {
      return (
        <div className='item-nav youtube-video-nav'>
          {logo}
          <div className='btn-grp' >
            {prevButton}
            {nextButton}
          </div>
        </div>
      )
    }
    if (this.props.nextPageToken) {
      return (
        <div className='item-nav youtube-video-nav'>
          {logo}
          <div className='btn-grp' >
            {nextButton}
          </div>
        </div>
      )
    }
    return (
      <div />
    )
  }
}

export default connect(
  state => ({
    id: state.Youtube.id,
    videos: state.Youtube.videos,
    logo: state.Youtube.logo,
    channel_url: state.Youtube.channel_url,
    prevPageToken: state.Youtube.prevPageToken,
    nextPageToken: state.Youtube.nextPageToken,
  }),
  { getNextVideos },
)(YoutubeVideoNav)

import React, { Component, PropTypes } from 'react'
import './youtubeNav.scss'
import store from '../store/configureStore'
import { connect } from 'react-redux'
import { getNextVideos } from '../actions/getNextVideos'

@connect((store) => {
  return {
    prevPageToken: store.Youtube.prevPageToken,
    nextPageToken: store.Youtube.nextPageToken,
    pid: store.Youtube.pid,
    vidResults: store.Youtube.vidResults,
    title: store.Youtube.title,
    channelHref: store.Youtube.channelHref,
    logo: store.Youtube.logo
  }
})
class YoutubeVideoNav extends Component {
  constructor (props) {
    super(props)
    this.ClickPrev = ::this.ClickPrev
    this.ClickNext = ::this.ClickNext
  }

  ClickPrev () {
    if (this.props.prevPageToken) {
      store.dispatch(
        {
          type: 'LOAD_YOUTUBE_VIDEO',
          video: getNextVideos(this.props.prevPageToken,
            this.props.pid, this.props.vidResults, this.props.logo)
        }
      )
    }
  }

  ClickNext () {
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

  static propTypes = {
    prevPageToken: PropTypes.string,
    nextPageToken: PropTypes.string,
    title: PropTypes.string,
    channelHref: PropTypes.string,
    pid: PropTypes.string,
    vidResults: PropTypes.number,
    logo: PropTypes.string
  }

  render () {
    const logo = (
      <a href={this.props.channelHref} target='_blank'
        className='title_youtube_channel block-style' >
        <img className='youtube-channel-logo' src={this.props.logo} alt='logo' />
        <p>{this.props.title}</p>
      </a>
    )
    const prevButton = (<button className='prev' onClick={this.ClickPrev} >
      <i className='fa fa-arrow-left' aria-hidden='true' />
    </button>)

    const nextButton = (<button className='next' onClick={this.ClickNext} >
      <i className='fa fa-arrow-right' aria-hidden='true' />
    </button>)

    if (this.props.prevPageToken && this.props.nextPageToken) {
      return (
        <div className='item youtube-video-nav'>
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
        <div className='item youtube-video-nav'>
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

export default YoutubeVideoNav

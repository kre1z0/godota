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
    videoTitle: store.Youtube.videoTitle
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
          video: getNextVideos(this.props.prevPageToken, this.props.pid, this.props.vidResults)
        }
      )
    }
  }
  ClickNext () {
    if (this.props.nextPageToken) {
      store.dispatch(
        {
          type: 'LOAD_YOUTUBE_VIDEO',
          video: getNextVideos(this.props.nextPageToken, this.props.pid, this.props.vidResults)
        }
      )
    }
  }
  static propTypes = {
    prevPageToken: PropTypes.string,
    nextPageToken: PropTypes.string,
    videoTitle: PropTypes.string,
    title: PropTypes.string,
    channelHref: PropTypes.string,
    pid: PropTypes.string,
    vidResults: PropTypes.number
  }
  render () {
    if (this.props.prevPageToken && this.props.nextPageToken) {
      return (
        <div className='youtube-video-nav clearfix'>
          <a href={this.props.channelHref} target='_blank'
            className='title_youtube_channel block-style'>{this.props.title}</a>
          <span className='title_youtube_video'>{this.props.videoTitle}</span>
          <div className='btn-grp'>
            <button className='next' onClick={this.ClickNext}>
              <i className='fa fa-arrow-right' aria-hidden='true' />
            </button>
            <button className='prev' onClick={this.ClickPrev}>
              <i className='fa fa-arrow-left' aria-hidden='true' />
            </button>
          </div>
        </div>
      )
    } else {
      if (this.props.nextPageToken) {
        return (
          <div className='youtube-video-nav clearfix'>
            <a href={this.props.channelHref} target='_blank'
              className='title_youtube_channel block-style'>{this.props.title}</a>
            <span className='title_youtube_video'>{this.props.videoTitle}</span>
            <div className='btn-grp'>
              <button className='next' onClick={this.ClickNext}>
                <i className='fa fa-arrow-right' aria-hidden='true' />
              </button>
            </div>
          </div>
        )
      }
    }
    return (
      <div />
    )
  }
}

export default YoutubeVideoNav

import React, { Component, PropTypes } from 'react'
import './video.scss'
import { connect } from 'react-redux'
import Loading from 'react-loading' // https://github.com/cezary/react-loading
import classNames from 'classnames'
import store from '../store/configureStore'

@connect((store) => {
  return {
    video: store.Twitch.video,
    windowHeight: store.Twitch.windowHeight,
    windowWidth: store.Twitch.windowWidth,
    img: store.Twitch.img,
    date: store.Twitch.date,
    display: store.Twitch.display,
    loader: store.Twitch.loader
  }
})
class Video extends Component {
  constructor (props) {
    super(props)
    this.handleImageLoaded = ::this.handleImageLoaded
  }
  handleImageLoaded () {
    store.dispatch({
      type: 'LOADER_IMG',
      loader: false
    })
  }
  static propTypes = {
    img: PropTypes.string,
    windowWidth: PropTypes.number,
    windowHeight: PropTypes.number,
    video: PropTypes.string,
    display: PropTypes.string,
    date: PropTypes.string,
    loader: PropTypes.bool
  }
  render () {
    const { img, windowWidth, windowHeight, video, display, date } = this.props
    const block = classNames('img-loading', { loader: this.props.loader })
    return (
      <div className='video-block block-style' >
        <iframe width={windowWidth}
          height={windowHeight}
          className='videoFrame'
          id='videoFrame'
          src={video}
          frameBorder='0' allowFullScreen='allowFullScreen' scrolling='no'
        />
        <span className='twitch-date'
          style={{ display: display }} >
          {date}
        </span>
        <img className='video-img'
          src={img}
          style={{ display: display }}
          onLoad={this.handleImageLoaded}
        />
        <div className={block} >
          <Loading type='spin' color='#272727' />
        </div>
      </div>
    )
  }
}

export default Video

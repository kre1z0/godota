import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

@connect((store) => {
  return {
    video: store.Twitch.video,
    windowHeight: store.Twitch.windowHeight,
    windowWidth: store.Twitch.windowWidth,
    img: store.Twitch.img,
    date: store.Twitch.date,
    display: store.Twitch.display
  }
})

class Video extends Component {
  static propTypes = {
    img: PropTypes.string,
    windowWidth: PropTypes.number,
    windowHeight: PropTypes.number,
    video: PropTypes.string,
    display: PropTypes.string,
    date: PropTypes.string
  }
  render () {
    const { img, windowWidth, windowHeight, video, display, date } = this.props
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
        />
      </div>
    )
  }
}

export default Video

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { twitchImageLoader } from '../actions/twitch'
import Image from './twitch/Image'

class Video extends Component {
  static propTypes = {
    video: PropTypes.string,
  }
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className='video-block block-style' >
        <Image />
        <iframe
          className='videoFrame'
          id='videoFrame'
          src={this.props.video}
          frameBorder='0' allowFullScreen='allowFullScreen' scrolling='no'
        />
      </div>
    )
  }
}

export default connect(state => ({
  video: state.Video.video,
}),
  { twitchImageLoader },
)(Video)

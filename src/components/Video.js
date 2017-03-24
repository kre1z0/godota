import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import Image from './twitch/Image'

class Video extends Component {
  static propTypes = {
    selected: PropTypes.bool,
    active: PropTypes.bool,
    video: PropTypes.string,
  }
  render() {
    const active = classNames('video-block block-style',
      { active: this.props.active === true ||
      (this.props.selected === true && this.props.video !== '') })
    return (
      <div className={active} >
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
  active: state.Video.active,
  selected: state.Twitch.selected,
}),
  { },
)(Video)

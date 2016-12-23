import React, { Component, PropTypes } from 'react'
// ➡ https://github.com/cezary/react-loading
import Loading from 'react-loading'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { twitchImageLoader } from '../../actions/twitch'

class Image extends Component {
  static propTypes = {
    image: PropTypes.object,
    loader: PropTypes.bool,
    twitchImageLoader: PropTypes.func,
  }
  constructor(props) {
    super(props)
    this.handleImageLoaded = ::this.handleImageLoaded
  }

  handleImageLoaded() {
    this.props.twitchImageLoader(true)
  }

  render() {
    const loader = classNames('img-loading', { loader: this.props.loader })
    const isVisible = classNames('twitch_image', { imageIsVisible: this.props.imageIsVisible })
    return (
      <div className={isVisible}>
        <span className='twitch-date' >
          {this.props.image.date}
        </span>
        <img className='video-img'
          src={this.props.image.url}
          onLoad={this.handleImageLoaded}
          alt={this.props.image.url}
        />
        <div className={loader} >
          <Loading type='spin' color='#ffffff' />
        </div>
      </div>
    )
  }
}

export default connect(state => ({
  image: state.Twitch.image,
  loader: state.Twitch.loader,
  imageIsVisible: state.Twitch.imageIsVisible,
}),
  { twitchImageLoader },
)(Image)

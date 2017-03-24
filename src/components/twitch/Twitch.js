import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import {
  getStreamerList, loadTwitchImage,
  twitchImageLoader, hideTwitchImage, loadStreamer,
} from '../../actions/twitch'

class Twitch extends Component {
  static propTypes = {
    twitch: PropTypes.array,
    selected: PropTypes.bool,
    getStreamerList: PropTypes.func,
    loadTwitchImage: PropTypes.func,
    twitchImageLoader: PropTypes.func,
    hideTwitchImage: PropTypes.func,
    loadStreamer: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.handleClick = ::this.handleClick
    this.onMouseEnterHandler = ::this.onMouseEnterHandler
    this.onMouseLeaveHandler = ::this.onMouseLeaveHandler
    this.state = {
      selectedIndex: [],
    }
  }

  componentDidMount() {
    this.props.getStreamerList()
    setInterval(() => {
      this.props.getStreamerList()
    }, 60000)
  }

  onMouseEnterHandler(item) {
    this.props.hideTwitchImage(false)
    this.props.loadTwitchImage(item)
    this.props.twitchImageLoader(false)
  }

  onMouseLeaveHandler() {
    this.props.hideTwitchImage(true)
  }

  handleClick(streamer) {
    this.props.loadStreamer(streamer)
    this.setState({ selectedIndex: streamer.channel.id })
  }

  render() {
    let twitches
    if (this.props.twitch) {
      twitches = this.props.twitch.map((item) => {
        const selected = classNames({ active:
            (this.state.selectedIndex === item.channel.id) && this.props.selected === true })
        return (
          <li onClick={() => this.handleClick(item)}
            onMouseEnter={() => this.onMouseEnterHandler(item)}
            onMouseLeave={this.onMouseLeaveHandler}
            className={selected}
            title={item.channel.status} key={item.channel.id}
          >
            <img src={`./static/images/flag_country/${item.channel.country}.png`}
              title={item.channel.country} alt={item.channel.country}
            />
            <span className='streamers__name' >{item.channel.nickname}</span>
            <div className='streamers__viewers' >
              <span>{item.viewers}</span>
              <i className='fa fa-user' />
            </div>
          </li>)
      })
    }
    return (
      <div className='streamers' >
        <ul>
          {
            twitches || <div className='loading' >
              <div className='loading-bar' />
            </div>
          }
        </ul>
      </div>
    )
  }
}

export default connect(
  state => ({
    selected: state.Twitch.selected,
    twitch: state.Twitch.twitch,
  }),
  { getStreamerList, loadTwitchImage, twitchImageLoader, hideTwitchImage, loadStreamer },
)(Twitch)

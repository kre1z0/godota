import './twitch.scss'
import React, { Component, PropTypes } from 'react'
import store from '../store/configureStore'
import { connect } from 'react-redux'
import { fetchTwitch } from '../actions/fetchTwitch'
import { resizeTwitchIframe, resizeTwitchImage } from '../actions/resizeFunction'

@connect((store) => {
  return {
    active: store.Twitch.active,
    twitch: store.Twitch.twitch
  }
})
class Twitch extends Component {
  constructor (props) {
    super(props)
    this.handleResize = ::this.handleResize
    this.state = {
      selectedIndex: []
    }
  }

  componentWillMount () {
    fetchTwitch()
    window.removeEventListener('resize', this.handleResize)
  }

  componentDidMount () {
    setInterval(() => {
      fetchTwitch()
    }, 60000)
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  }

  handleResize () {
    resizeTwitchIframe()
  }

  onMouseEnterHandler (item) {
    this.handleResize()
    resizeTwitchImage(item)
    store.dispatch({
      type: 'LOADER_IMG',
      loader: true
    })
  }

  onMouseLeaveHandler () {
    store.dispatch(
      [
        {
          type: 'LOAD_IMG',
          display: 'none'
        },
        {
          type: 'LOADER_IMG',
          loader: false
        }
      ]
    )
  }

  handleClick (item) {
    resizeTwitchIframe()
    this.setState({ selectedIndex: item.channel.id })
    const nameString = item.channel.name
    const url = 'https://player.twitch.tv/?channel=' + nameString
    const urlChat = 'https://www.twitch.tv/' + nameString + '/chat?popout='

    store.dispatch([
      {
        type: 'LOAD_STREAM',
        video: url,
        chat: urlChat,
        display: 'none',
        active: 'active'
      },
      {
        type: 'LOAD_YOUTUBE_ACTIVE',
        active: ''
      }
    ])
  }

  static propTypes = {
    twitch: PropTypes.array,
    active: PropTypes.string
  }

  render () {
    let twitches
    if (this.props.twitch) {
      twitches = this.props.twitch.map((item) => {
        return (
          <li onClick={() => this.handleClick(item)}
            onMouseEnter={() => this.onMouseEnterHandler(item)}
            onMouseLeave={this.onMouseLeaveHandler}
            className={(this.state.selectedIndex === item.channel.id) ? this.props.active : ''}
            title={item.channel.status} key={item.channel.id} >
            <img src={'./images/flag_country/' + item.channel.country + '.png'}
              title={item.channel.country} />
            <span className='streamers__name' >{item.channel.nickname}</span>
            <div className='streamers__viewers' >
              <span>{item.viewers}</span>
              <i className='fa fa-user' />
            </div>
          </li>
        )
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

export default Twitch

import React, { Component, PropTypes } from 'react'
import './youtubeList.scss'
import { getChannelId } from '../actions/youtubeChannelId'
import { connect } from 'react-redux'

@connect((store) => {
  return {
    youtubeGame: store.ChangeGame.youtubeGame
  }
})
export default class YoutubeList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedIndex: []
    }
  }

  handleClick (item) {
    this.setState({ selectedIndex: item.id || item.youtubeId })

    const channelName = item.id
    const channelId = item.youtubeId

    getChannelId(channelName, channelId)
  }
  static propTypes = {
    youtubeGame: PropTypes.array
  }
  render () {
    let youtube = this.props.youtubeGame
    if (youtube) {
      youtube = youtube.map((item) => {
        return (
          <li className={(item.id || item.youtubeId) === this.state.selectedIndex ? 'active' : ''}
            onClick={() => this.handleClick(item)}
            title={item.title}
            key={item.id || item.youtubeId} >
            {item.name}
          </li>
        )
      })
    }
    return (
      <div className='youtube-list' >
        <ul>
          { youtube }
        </ul>
      </div>

    )
  }
}


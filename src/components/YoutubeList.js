import React, { Component } from 'react'
import './youtubeList.scss'
import { getChannelId } from '../actions/youtubeChannelId'
import dota2 from '../json/youtube.json'

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
  render () {
    let youtube = dota2
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


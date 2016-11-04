import React, { Component } from 'react'
import './youtubeList.scss'
import { connect } from 'react-redux'
import { doList } from '../actions/youtube'

@connect((store) => {
  return {
    youtube: store.Youtube.youtube,
  }
})
export default class YoutubeList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedIndex: []
    }
  }
  componentWillMount () {
    doList()
  }
  handleClick (item) {
    this.setState({ selectedIndex: item.id || item.youtubeId })

    // const channelName = item.id
    // const channelId = item.youtubeId
    // const oneChannel = true
    //
    // const args = [channelName, channelId, oneChannel]
    // getYoutubeChannelsList(...args)
  }

  render () {
    let youtube
    if (this.props.youtube) {
      youtube = this.props.youtube.map((item) => {
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
          {youtube}
        </ul>
      </div>
    )
  }
}

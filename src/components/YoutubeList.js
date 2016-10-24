import React from 'react'
import store from '../store/configureStore'
import { getChannelId } from '../actions/youtubeChannelId'
import { connect } from 'react-redux'
// import dota2youtube from '../json/dota2-youtube.json'

@connect((store) => {
  return {
    youtubeGame: store.ChangeGame.youtubeGame
  }
})
export default class YoutubeList extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      activeIndex: []
    }
  }
  componentWillMount () {
    // store.dispatch({
    //   type: "LOAD_YOUTUBE",
    //   youtubeGame: dota2youtube
    // });
  }
  handleClick (item) {
    this.setState({ selectedIndex: item.id || item.youtubeId })

    const channelName = item.id
    const channelId = item.youtubeId

    getChannelId(channelName, channelId)
  }

  render () {
    let youtube
    if (this.props.youtubeGame) {
      youtube = this.props.youtubeGame.map((item) => {
        return (
          <li className={(item.id || item.youtubeId) === this.state.selectedIndex ? 'active' : ''}
            onClick={this.handleClick.bind(this, item)}
            title={item.title}
            key={item.id || item.youtubeId}>
            {item.name}
          </li>
        )
      })
    }
    return (
      <div className='youtube-list'>
        <ul>
          { youtube }
        </ul>
      </div>

    )
  }
}


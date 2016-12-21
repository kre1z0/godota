import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { getYoutubeChannelsList, getYoutubeVideosFromChannel } from '../../actions/youtube'

class YoutubeList extends Component {
  static propTypes = {
    youtubeChannelsList: PropTypes.array,
    getYoutubeChannelsList: PropTypes.func,
    getYoutubeVideosFromChannel: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = {
      selectedIndex: [],
    }
  }

  componentDidMount() {
    this.props.getYoutubeChannelsList()
  }

  handleClick(item) {
    this.setState({ selectedIndex: item.id || item.youtubeId })
    this.props.getYoutubeVideosFromChannel(item)
  }
  render() {
    let youtube
    if (this.props.youtubeChannelsList) {
      youtube = this.props.youtubeChannelsList.map(item => (
        <li className={(item.id || item.youtubeId) === this.state.selectedIndex ? 'active' : ''}
          onClick={() => this.handleClick(item)}
          title={item.title}
          key={item.id || item.youtubeId}
        >
          {item.name}
        </li>),
      )
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

export default connect(
  state => ({
    youtubeChannelsList: state.Youtube.youtubeChannelsList,
    youtubeChannelsListError: state.Youtube.youtubeChannelsListError,
  }),
  { getYoutubeChannelsList, getYoutubeVideosFromChannel },
)(YoutubeList)

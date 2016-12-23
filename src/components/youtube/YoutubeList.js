import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { getYoutubeChannelsList, getYoutubeVideosFromChannel } from '../../actions/youtube'

class YoutubeList extends Component {
  static propTypes = {
    channels_list: PropTypes.array,
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
    return (
      <div className='youtube-list' >
        <ul>
          {this.props.channels_list.map(item => (
            <li className={(item.id || item.youtubeId) === this.state.selectedIndex ? 'active' : ''}
              onClick={() => this.handleClick(item)}
              title={item.title}
              key={item.id || item.youtubeId}
            >
              {item.name}
            </li>),
          )}
        </ul>
      </div>
    )
  }
}

export default connect(
  state => ({
    channels_list: state.Youtube.channels_list,
  }),
  { getYoutubeChannelsList, getYoutubeVideosFromChannel },
)(YoutubeList)

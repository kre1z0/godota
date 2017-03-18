import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment' // http://momentjs.com/
import { getChannelsVideos } from '../../actions/getYoutube'

class Header extends React.Component {
  static propTypes = {
    selected: React.PropTypes.string,
    getChannelsVideos: React.PropTypes.func,
  }
  constructor(props) {
    super(props)
    const TODAY = moment().clone().startOf('day')
    const YESTERDAY = moment().clone().subtract(1, 'days').startOf('day')
    const beforeYESTERDAY = moment().clone().subtract(2, 'days').startOf('day')
    this.state = {
      selectedIndex: 'сегодня',
      youtubeSortMenu: [
        {
          name: 'сегодня',
          publish: TODAY,
        },
        {
          name: 'вчера',
          publish: YESTERDAY,
        },
        {
          name: 'позавчера',
          publish: beforeYESTERDAY,
        },
      ],
    }
  }
  componentWillMount() {
    getChannelsVideos(this.state.youtubeSortMenu[0].publish)
  }

  handleClick(item) {
    this.props.getChannelsVideos(item.publish)
    this.setState({ selectedIndex: item.name })
  }

  render() {
    return (
      <div className='youtube-sort' >
        <div className='logo' />
        <ul>
          {
            this.state.youtubeSortMenu.map((item) => {
              return (
                <li key={item.name}
                  className={(this.state.selectedIndex === item.name) ? this.props.selected : ''}
                  onClick={() => this.handleClick(item)}
                >
                  {item.name}
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }
}

export default connect(
  state => ({
    selected: state.Youtube.selected,
  }),
  { getChannelsVideos },
)(Header)


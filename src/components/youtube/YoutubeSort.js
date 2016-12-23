import React from 'react'
import store from '../../store/configureStore'
import { getChannelsVideos } from '../../actions/getYoutube'
import moment from 'moment' // http://momentjs.com/
import { connect } from 'react-redux'

const TODAY = moment().clone().startOf('day')
const YESTERDAY = moment().clone().subtract(1, 'days').startOf('day')
const beforeYESTERDAY = moment().clone().subtract(2, 'days').startOf('day')

const youtubeSortMenu = [
  {
    name: 'сегодня',
    publish: TODAY
  },
  {
    name: 'вчера',
    publish: YESTERDAY
  },
  {
    name: 'позавчера',
    publish: beforeYESTERDAY
  }
]

@connect((store) => {
  return {
    selected: store.Youtube.selected
  }
})
class Header extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedIndex: 'сегодня'
    }
  }

  componentWillMount () {
    // getChannelsVideos(youtubeSortMenu[0].publish)
  }

  handleClick (item) {
    getChannelsVideos(item.publish)
    this.setState({ selectedIndex: item.name })
    store.dispatch({
      type: 'YOUTUBE_SORT_ACTIVE',
      selected: 'selected'
    })
  }
  static propTypes = {
    selected: React.PropTypes.string
  }
  render () {
    return (
      <div className='youtube-sort' >
        <div className='logo' />
        <ul>
          {
            youtubeSortMenu.map((item) => {
              return (
                <li key={item.name}
                  className={(this.state.selectedIndex === item.name) ? this.props.selected : ''}
                  onClick={() => this.handleClick(item)} >
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

export default Header

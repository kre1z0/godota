import React from 'react'
import './header.scss'
import { getChannelsVideos } from '../actions/getYoutube'

const Menu = [
  {
    name: 'сегодня',
    during : 'day'
  },
  {
    name: 'вчера'
  },
  {
    name: 'позавчера'
  },
  {
    name: 'неделю ',
    during : 'week'
  }
]

class Header extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedIndex: 'сегодня'
    }
  }
  componentWillMount () {
    getChannelsVideos()
  }
  handleClick (item) {
    getChannelsVideos(item.during)
    this.setState({ selectedIndex: item.name })
  }

  render () {
    return (
      <header className='header block-style' >
        <ul>
          {
            Menu.map((item) => {
              return (
                <li key={item.name}
                  className={(this.state.selectedIndex === item.name) && 'active'}
                  onClick={() => this.handleClick(item)} >
                  {item.name}
                </li>
              )
            })
          }
        </ul>
      </header>
    )
  }
}

export default Header

import React from 'react'
import './header.scss'
import store from '../store/configureStore'
import { fetchTwitch } from '../actions/fetchTwitch'

const Menu = [
  {
    to: '/',
    name: 'DOTA2',
  },
  {
    to: '/',
    name: 'CS GO',
  }
]

class Header extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedIndex: 'DOTA2'
    }
  }

  handleClick (item) {
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

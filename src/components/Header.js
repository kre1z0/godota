import React from 'react'
import './header.scss'
import store from '../store/configureStore'
import csgoTwitch from '../json/cs-go-twitch.json'
import csgoYoutube from '../json/cs-go-youtube.json'
import dota2twitch from '../json/dota2-twitch.json'
import dota2youtube from '../json/dota2-youtube.json'
import { fetchTwitch } from '../actions/fetchTwitch'

const Menu = [
  {
    to: '/',
    name: 'DOTA2',
    youtubeJson: dota2youtube,
    twitchJson: dota2twitch,
    twitter: 'https://twitter.com/Kreiz0/lists/dota'
  },
  {
    to: '/',
    name: 'CS GO',
    youtubeJson: csgoYoutube,
    twitchJson: csgoTwitch,
    twitter: 'https://twitter.com/Kreiz0/lists/csgo'
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
    if (item.twitchJson || item.youtubeJson) {
      store.dispatch([
        {
          type: 'LOAD_TWITCH',
          twitchGame: fetchTwitch(item.twitchJson)
        },
        {
          type: 'LOAD_YOUTUBE',
          youtubeGame: item.youtubeJson
        },
        {
          type: 'LOAD_TWITTER',
          twitterGame: item.twitter
        }
      ])
    }
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

import React from 'react'
import store from '../store/configureStore'
import { Link } from 'react-router'
import moment from 'moment'
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
  },
  {
    to: '/Start',
    name: 'Start'
  }
]

export default class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedIndex: 'DOTA2'
    }
  }
  componentDidMount () {
    moment.locale('ru')
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
      <div className='container'>
        <header className='header block-style'>
          <ul>
            {
              Menu.map((item) => {
                return (
                  <li key={item.name}>
                    <Link to={item.to} className={(this.state.selectedIndex === item.name) && 'active'}
                      onClick={this.handleClick.bind(this, item)}>
                      {item.name}
                    </Link>
                  </li>
                )
              })
            }
          </ul>
        </header>
        {this.props.children}
      </div>
    )
  }
}


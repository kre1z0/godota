import React from 'react'
import Twitter from '../components/Twitter'
import Video from '../components/Video'
import Twitch from '../components/Twitch'
import Chat from '../components/Chat'
import YoutubeList from '../components/YoutubeList'
import YoutubeVideoList from '../components/YoutubeVideo'
import Notes from '../components/Notes'

const Home = () => (
  <div className='home' >
    <div className='left_side' >
      <Twitch />
      <Twitter />
    </div>
    <div id='center_side' className='center_side' >
      <Video />
      <YoutubeVideoList />
    </div>
    <div className='right_side' >
      <Chat />
      <YoutubeList />
      <Notes />
    </div>
  </div>
)

export default Home

import React from 'react'
import Twitter from '../components/Twitter'
import Video from '../components/Video'
import Twitch from '../components/Twitch'
import Chat from '../components/Chat'
import YoutubeList from '../components/YoutubeList'
import YoutubeVideoList from '../components/YoutubeVideoList'
import Notes from '../components/Notes'
import YoutubeVideoNav from '../components/YoutubeVideoNav'

const Home = () => (
  <div className='home'>
    <div className='left_side'>
      <Twitch />
      <Twitter />
    </div>
    <div id='center_side' className='center_side'>
      <Video />
      <YoutubeVideoNav />
      <YoutubeVideoList />
    </div>
    <div className='right_side'>
      <Chat />
      <YoutubeList />
      <Notes />
    </div>
  </div>
)

export default Home


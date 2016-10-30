import React from 'react'
import Twitter from '../components/Twitter'
import Video from '../components/Video'
import Twitch from '../components/Twitch'
import Chat from '../components/Chat'
import YoutubeList from '../components/YoutubeList'
import YoutubeVideoList from '../components/YoutubeVideo'
import Notes from '../components/Notes'
import YoutubeVideoNav from '../components/YoutubeNav'
import Header from '../components/Header'


const CoreLayout = () => (
  <div className='container' >
    <Header />
    <div className='home' >
      <div className='left_side' >
        <Twitch />
        <Twitter />
      </div>
      <div id='center_side' className='center_side' >
        <Video />
        <YoutubeVideoNav />
        <YoutubeVideoList />
      </div>
      <div className='right_side' >
        <Chat />
        <YoutubeList />
        <Notes />
      </div>
    </div>
  </div>
)

export default CoreLayout


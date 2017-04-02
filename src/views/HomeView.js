import React from 'react'
import Twitter from '../components/Twitter'
import Video from '../components/Video'
import Twitch from '../components/twitch/Twitch'
import Chat from '../components/twitch/Chat'
import YoutubeList from '../components/youtube/YoutubeList'
import NewsList from '../components/NewsList'
import YoutubeVideoList from '../components/youtube/YoutubeVideos'
import Notes from '../components/Notes'
import Header from '../components/youtube/YoutubeSort'

const Home = () => (
  <div className='home' >
    <div className='left_side' >
      <Twitch />
      <Twitter />
    </div>
    <div id='center_side' className='center_side' >
      <Video />
      <YoutubeVideoList />
      <NewsList />
    </div>
    <div className='right_side' >
      <Chat />
      <Header />
      <YoutubeList />
      <Notes />
    </div>
  </div>
)

export default Home

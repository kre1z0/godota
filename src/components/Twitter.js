import React, { Component } from 'react'
import ReactDOM from 'react-dom'
// https://github.com/malte-wessel/react-custom-scrollbars/tree/master/docs
import { Scrollbars } from 'react-custom-scrollbars'

class Twitter extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    const twitterscript = document.createElement('script')
    twitterscript.src = '//platform.twitter.com/widgets.js'
    twitterscript.async = true
    twitterscript.id = 'twitter-wjs'
    document.body.appendChild(twitterscript)
  }
  render() {
    return (
      <Scrollbars className='scroll_bar'
        style={{ height: 1300 }}
        renderTrackVertical={props => <div {...props} className='track-vertical' />}
        renderThumbVertical={props => <div {...props} className='thumb-vertical' />}
        renderView={props => <div {...props} className='view' />} >
        <div className='scroll_bar_wrap' >
          <a
            href='https://twitter.com/Kreiz0/lists/dota'
            data-link-color='#239DFF'
            data-theme='dark'
            data-border-color='#444444'
            className='twitter-timeline'
            data-chrome='nofooter transparent noheader'
          />
        </div>
      </Scrollbars>
    )
  }
}

export default Twitter


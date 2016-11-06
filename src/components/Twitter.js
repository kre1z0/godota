import React, { Component, PropTypes } from 'react'
import './twitter.scss'
import ReactDOM from 'react-dom'
// react-custom-scrollbars docs
// https://github.com/malte-wessel/react-custom-scrollbars/tree/master/docs
import { Scrollbars } from 'react-custom-scrollbars'

class Twitter extends Component {
  constructor (props) {
    super(props)
    this.state = ({ initialized: false, key: 0 })
    this.makeTwitter = ::this.makeTwitter
  }

// ======= start section mounting {
  componentDidMount () {
    if (this.state.initialized) {
      return
    }
    // load if twitter is not in main DOM
    if (typeof twttr === 'undefined') {
      const twittertimeline = ReactDOM.findDOMNode(this.refs.twittertimeline)
      const twitterscript = document.createElement('script')
      twitterscript.src = '//platform.twitter.com/widgets.js'
      twitterscript.async = true
      twitterscript.id = 'twitter-wjs'
      twittertimeline.parentNode.appendChild(twitterscript)
    } else {
      twttr.widgets.load()
    }

    this.initialized()
  }

  componentDidUpdate () {
    this.makeTwitter()
  }

  // ======= end section mounting }

  initialized () {
    this.setState({ initialized: true })
  }

  makeTwitter () {
    const twittertimeline = ReactDOM.findDOMNode(this.refs.twittertimeline)
    const twitterscript = document.createElement('script')
    twitterscript.src = '//platform.twitter.com/widgets.js'
    twitterscript.async = true
    twitterscript.id = 'twitter-wjs'
    twittertimeline.parentNode.appendChild(twitterscript)
  }

  render () {
    return (
      <Scrollbars className='scroll_bar'
        style={{ height: 800 }}
        renderTrackVertical={props => <div {...props} className='track-vertical' />}
        renderThumbVertical={props => <div {...props} className='thumb-vertical' />}
        renderView={props => <div {...props} className='view' />} >
        <div className='scroll_bar_wrap'>
          <a
            href='https://twitter.com/Kreiz0/lists/dota'
            data-link-color='#239DFF'
            data-theme='dark'
            data-border-color='#444444'
            ref='twittertimeline'
            className='twitter-timeline'
            data-chrome='nofooter transparent noheader'
          />
        </div>
      </Scrollbars>
    )
  }
}

export default Twitter


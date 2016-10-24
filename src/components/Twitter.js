import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'

// this component have special method of loader

@connect((store) => {
  return {
    twitterGame: store.ChangeGame.twitterGame
  }
})

export default class Twitter extends React.Component {
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
      <div key={this.props.twitterGame}>
        <a
          href={this.props.twitterGame}
          data-link-color='#239DFF'
          data-theme='dark'
          data-border-color='#444444'
          ref='twittertimeline'
          className='twitter-timeline'
          data-chrome='nofooter transparent noheader'
          data-height='1300'
        />
      </div>
    )
  }
}


import React, { Component } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'

class Chat extends Component {
  static propTypes = {
    chat: React.PropTypes.string,
  }

  constructor(props) {
    super(props)
    this.state = {
      active: false,
      plus: true,
      minus: false,
    }
    this.handleClick = ::this.handleClick
  }

  handleClick() {
    this.setState({
      active: !this.state.active,
      plus: !this.state.plus,
      minus: !this.state.minus,
    })
  }

  render() {
    const button = classNames('block-style chat-button', { active: this.state.active })
    const font = classNames('fa', { 'fa-plus-square': this.state.plus, 'fa-minus-square': this.state.minus })
    const block = classNames('chat-block', { active: this.state.active })
    return (
      <div className='twitch_chat' >
        <div className={button} onClick={this.handleClick} >
          <i className={font} />
        </div>
        <div className={block} >
          <div className='block-style' >
            <iframe height={555}
              className='chatFrame' src={this.props.chat}
              frameBorder='0' scrolling='no'
            />
          </div>
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({
    chat: state.Twitch.chat,
  }),
)(Chat)

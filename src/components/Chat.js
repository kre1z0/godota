import React from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'

@connect((store) => {
  return {
    chat: store.Twitch.chat
  }
})

export default class Chat extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      active: false,
      plus: true,
      minus: false
    }
    this.handleClick = ::this.handleClick
  }

  static propTypes = {
    chat: React.PropTypes.string
  };

  handleClick () {
    this.setState({
      active: !this.state.active,
      plus: !this.state.plus,
      minus: !this.state.minus
    })
  }
  render () {
    const button = classNames('block-style chat-button', { active: this.state.active })
    const font = classNames('fa', { 'fa-plus-square': this.state.plus, 'fa-minus-square': this.state.minus })
    const block = classNames('chat-block', { active: this.state.active })
    return (
      <div>
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

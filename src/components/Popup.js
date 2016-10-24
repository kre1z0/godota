import React from 'react'

export default class Popup extends React.Component {
  constructor (props) {
    super(props)
    this.handleEscKeyDown = ::this.handleEscKeyDown
    this.state = {
      opened: false
    }
  }

  componentDidMount () {
    document.addEventListener('keydown', this.handleEscKeyDown)
  }

  handleEscKeyDown (e) {
    const ESC = 27

    if (e.keyCode === ESC) {
      this.setState({
        opened: false
      })
    }
  }

  handleClick () {
    this.setState({ opened: !this.state.opened })
  }

  render () {
    const popUpClass = this.state.opened ? 'popup popup__opened' : 'popup'

    return (
      <div>
        <button type='button' className='button trigger'
          onClick={::this.handleClick} >View Pop-up
        </button>
        <div className={popUpClass} >
          <div className='popup__container' >
            <p className='popup__caption' >
              Are you sure you want to deconste this element?
            </p>
            <div className='popup__actions' >
              <button type='button' className='button popup__button' >Yes</button>
              <button type='button' className='button popup__button' >No</button>
            </div>
            <button
              className='button popup__close'
              onClick={this.handleClick} >&times;</button>
          </div>
        </div>
      </div>
    )
  }
}


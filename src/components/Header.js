import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

class Header extends Component {
  static propTypes = {
    twitch: PropTypes.array,
  }
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  componentDidMount() {
  }
  render() {
    return (
      <header className='header' >
        <h1>Header</h1>
      </header>
    )
  }
}

export default connect(
  state => ({
    twitch: state.Twitch.twitch,
  }),
  { },
)(Header)

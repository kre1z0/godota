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
        <ul>
          <li><a>test 1</a> </li>
          <li><a>test 2</a></li>
          <li><a>test 3</a></li>
        </ul>
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

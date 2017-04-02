import React, { Component, PropTypes } from 'react'
import { Link, IndexLink } from 'react-router'
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
          <li>
            <IndexLink to='/'>
              Godota
            </IndexLink>
          </li>
          <li>
            <Link to='/news/' activeClassName='active'>
              News
            </Link>
          </li>
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

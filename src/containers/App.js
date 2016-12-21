import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Home from '../views/HomeView'
import Header from '../components/Header'

class App extends Component {
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
      <div className='container'>
        <Header />
        <Home />
      </div>
    )
  }
}

export default connect(
  state => ({
    twitch: state.Twitch.twitch,
  }),
  { },
)(App)

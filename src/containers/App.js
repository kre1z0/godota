import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Home from '../views/HomeView'
import Header from '../components/Header'
import moment from 'moment'

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
    moment.locale('ru')
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

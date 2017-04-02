import React, { Component, PropTypes } from 'react'
import moment from 'moment'
import { connect } from 'react-redux'
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
    moment.locale('ru')
  }
  render() {
    return (
      <div className='wrapper'>
        <Header />
        {this.props.children}
      </div>
    )
  }
}

export default connect(
  state => ({
  }),
  { },
)(App)

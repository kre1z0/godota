import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import NEWS from '../static/json/news.json'

class News extends Component {
  static propTypes = {
    twitch: PropTypes.array,
  }

  constructor(props) {
    super(props)
    this.state = {
      news: NEWS,
    }
  }

  componentDidMount() {

  }

  render() {
    return (
      <div className='news' >
        {this.state.news.map((item) => {
          return (
            <div key={item.id}
              className='news-item block-style clearfix'
            >
              <div className='news-image' >
                <img src={item.image}
                  alt='dota'
                />
              </div>
              <div className='news-content' >
                <h3 className='news-title' >
                  {item.title}
                </h3>
                <div className='news-date' >
                  {item.date}
                </div>
                <p>{item.preview_text}</p>
                <div className='news-info' >
                  <i className='fa fa-pencil-square-o' aria-hidden='true' />
                  <span>&nbsp;{item.count_comments}&nbsp;&nbsp;</span>
                  <i className='fa fa-eye' aria-hidden='true' />
                  <span>&nbsp;{item.views}</span>
                </div>
              </div>
            </div>
          )

        })}
      </div>
    )
  }
}

export default connect(
  state => ({
    twitch: state.Twitch.twitch,
  }),
  {},
)(News)

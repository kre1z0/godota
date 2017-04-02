import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import NEWS from '../static/json/news.json'
import { getNews } from '../actions/news'

class NewsList extends Component {
  static propTypes = {
    getNews: PropTypes.func,
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
      <div className='news-list-wrapper' >
        {this.state.news.map((item) => {
          return (
            <Link to={`/news/${item.id}`}
              className='news-item block-style clearfix'
              onClick={() => this.props.getNews(item.id)}
              key={item.id}
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
            </Link>
          )
        })}
      </div>
    )
  }
}

export default connect(
  state => ({}),
  { getNews },
)(NewsList)

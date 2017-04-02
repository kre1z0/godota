import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

class NewsView extends Component {
  static propTypes = {
    twitch: PropTypes.array,
  }

  constructor(props) {
    super(props)
    this.state = {
      tournament: [
        [
          [
            { team: 'navi' },
            { team: 'vg' },
          ],
          [
            { team: 'og' },
            { team: 'lgd' },
          ],
          [
            { team: 'faceless' },
            { team: 'vp' },
          ],
          [
            { team: 'empire' },
            { team: 'luqiud' },
          ],
        ],
        [
          [
            { team: 'navi' },
            { team: 'lgd' },
          ],
          [
            { team: 'vp' },
            { team: 'empire' },
          ],
        ],
        [
          [
            { team: 'navi' },
            { team: 'vp' },
          ],
        ],
        [
          [
            { team: 'navi' },
          ],
        ],
      ],
    }
  }

  componentDidMount() {

  }

  render() {
    console.log('tournament', this.state.tournament)
    return (
      <div className='container block-style' >
        <div className='news-block' >
          <h1>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi, doloribus error et ipsum modi natus
            officiis perferendis quis rem? Consectetur deserunt dignissimos ducimus nesciunt quidem reiciendis
            reprehenderit rerum sunt voluptate.</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem doloribus dolorum eius hic ipsum! Animi
            autem debitis dolores quasi similique. Accusamus exercitationem itaque molestiae quam rerum, sunt tempore
            veritatis! Modi.</p>
          <img src='https://i.ytimg.com/vi/IROw0ULt0cg/maxresdefault.jpg' alt='' />
          <div className='tournament-table' >
            {
              this.state.tournament.map((tournament) => {
                return tournament.map((item) => {
                  return (
                    <div className='col' >
                      <div className='match' >
                        <div className='team' >команда</div>
                        <div className='team' >команда</div>
                      </div>
                      <div className='match' >
                        <div className='team' >команда</div>
                        <div className='team' >команда</div>
                      </div>
                      <div className='match' >
                        <div className='team' >команда</div>
                        <div className='team' >команда</div>
                      </div>
                      <div className='match' >
                        <div className='team' >команда</div>
                        <div className='team' >команда</div>
                      </div>
                    </div>
                  )
                })
              })
            }
          </div>
          <div className='tournament-table' >
            <div className='col' >
              <div className='match' >
                <div className='team' >команда</div>
                <div className='team' >команда</div>
              </div>
              <div className='match' >
                <div className='team' >команда</div>
                <div className='team' >команда</div>
              </div>
              <div className='match' >
                <div className='team' >команда</div>
                <div className='team' >команда</div>
              </div>
              <div className='match' >
                <div className='team' >команда</div>
                <div className='team' >команда</div>
              </div>
            </div>
            <div className='col' >
              <div className='match' >
                <div className='team' >команда</div>
                <div className='team' >команда</div>
              </div>
              <div className='match' >
                <div className='team' >команда</div>
                <div className='team' >команда</div>
              </div>
            </div>
            <div className='col' >
              <div className='match' >
                <div className='team' >команда</div>
                <div className='team' >команда</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({}),
  {},
)(NewsView)

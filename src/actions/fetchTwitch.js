import 'isomorphic-fetch'
import store from '../store/configureStore'

export function fetchTwitch () {
  fetch('./json/twitch.json').then((response) => {
    return response.json()
  })
    .then((twitch) => {

      const all = []

      for (const name in twitch) {
        if (twitch.hasOwnProperty(name)) {
          all.push(twitch[name].id)
        }
      }
      const allStreamers = all.join()

      const url = 'https://api.twitch.tv/kraken/streams?channel=' + allStreamers + '?callback=JSON_CALLBACK'

      fetch(url, {
        headers: {
          'Client-ID': 'pwv7i6ch787xuonmdgskoi2b3vrfa0t'
        }
      }).then((response) => {
        return response.json()
      })
        .then((json) => {
          const list = json.streams

          function isGameDota (obj) {
            return obj.game === 'Dota 2'
          }

          const onlyDota2 = list.filter(isGameDota);

          list.map((e) => {
            const arr = twitch.find((equal) => (e.channel.name === equal.id))

            if (arr) {
              e.channel = Object.assign(e.channel, arr)
            }
          })
          store.dispatch({
            type: 'LOAD_TWITCH',
            twitch: onlyDota2
          })
        }).catch(function (ex) {
        console.log('parsing failed', ex)
      })

    }).catch(function (ex) {
    console.log('parsing failed', ex)
  })
}

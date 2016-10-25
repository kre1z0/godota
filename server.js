// Express server for production build

const path = require('path')
const express = require('express')
const app = express()
const port = 1988

app.use(express.static(path.join() + '/dist'))

app.listen(port, '0.0.0.0', function onStart (err) {
  if (err) {
    console.log(err)
  }
  console.info('production server ==> Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port)
})

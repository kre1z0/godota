const express = require('express')
const app = express()
const port = 3333
const path = require('path')

app.use(express.static(path.join() + '/backend'))

console.log(app.connect)

app.listen(port, '0.0.0.0', (err) => {
  if (err) {
    console.log(err)
  }
  console.info('back-end server ==> Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port)
})

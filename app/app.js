var express = require('express')
var app = express()

// compress
// http
// bodyparser
// debug
// env

app.get('/', function (req, res) {
  res.send('Hello migueloruiz hsols!')
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

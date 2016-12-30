// Dependences
// ==========================
var express = require('express')
var path = require('path')
var http = require('http')

// Midlleware
// ==========================
var favicon = require('serve-favicon')
var compression = require('compression')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')

// Routes
// ==========================
var index = require(path.join(__dirname, '/routes/index/index'))
var users = require(path.join(__dirname, '/routes/users/users'))

// Dev Dependences
// ==========================
var dotenv = require('dotenv')
dotenv.load()

var app = express()

// View Engine Setup
// ==========================
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// Server Setup
// ==========================
var port = process.env.PORT || 3000
app.set('port', port)
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(compression())
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

var server = http.createServer(app)
server.on('error', onError)
server.on('listening', onListening)

// Routes Setup
// ==========================
app.use('/', index)
app.use('/users', users)

// Event listener for HTTP server "error" event.
// ==========================
function onError (error) {
  console.log(error)
  if (error.syscall !== 'listen') throw error

  var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges')
      process.exit(1)
      break
    case 'EADDRINUSE':
      console.error(bind + ' is already in use')
      process.exit(1)
      break
    default:
      throw error
  }
}

// Event listener for HTTP server "listening" event.
// ==========================
function onListening () {
  var addr = server.address()
  var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port
  console.error('Listening on ' + bind)
  // debug('Listening on ' + bind)
}

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

// Start Listen Serve
// ==========================
app.listen(app.get('port'), function () {
  console.log('Node app is running on port', app.get('port'))
})
module.exports = app

const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const validator = require('express-validator')
const cors = require('cors')

const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const apiRouter = require('./routes/api')
const sampleRouter = require('./routes/api/samples')

const app = express()

const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./openapi')

const {NotAudioFileError, DatabaseError} = require('./errors')

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(logger('dev'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(validator())
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use('/static', express.static(path.join(__dirname, 'static')))

app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/api', apiRouter)
app.use('/api/samples', sampleRouter)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

app.use(function handleDatabaseError (err, req, res, next) {
  if (err instanceof DatabaseError) {
    return res.status(err.status).json(err)
  }
  next(err)
})

app.use(function handleMulterError (err, req, res, next) {
  if (err instanceof NotAudioFileError) {
    return res.status(err.status).json(err)
  }
  next(err)
})

// error handler
app.use(function handleGenericError (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  res.status(err.status || 500).json(err)
})

module.exports = app

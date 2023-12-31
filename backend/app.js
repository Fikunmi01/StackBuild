var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose')
const url = 'mongodb://127.0.0.1:27017/stackbuild'
const cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var postsRouter = require('./routes/post');
var searchRouter = require('./routes/search')

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// Enable CORS for all routes
app.use(cors());

app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/post', postsRouter);
app.use('/search', searchRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// connect db
mongoose.connect(url, {
})
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.log(err))
// port listen
app.listen(5000, () => console.log("You're connected on port 5000"))

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

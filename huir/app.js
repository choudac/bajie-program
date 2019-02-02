
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressLayouts = require('express-ejs-layouts');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var demoRouter = require('./routes/demo');
var picRouter = require('./routes/explain');
var btngroup1Router = require('./routes/btngroup1')
var btngroup2Router = require('./routes/btngroup2')
var btngroup3Router = require('./routes/btngroup3')
var btngroup4Router = require('./routes/btngroup4')
var priceRouter = require('./routes/price')
var resumeRouter = require('./routes/resume')
var aboutRouter = require('./routes/about')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/demo', demoRouter);
app.use('/explain', picRouter);
app.use('/btngroup1', btngroup1Router);
app.use('/btngroup2', btngroup2Router);
app.use('/btngroup3', btngroup3Router);
app.use('/btngroup4', btngroup4Router);
app.use('/price', priceRouter);
app.use('/resume', resumeRouter);
app.use('/about', aboutRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
//var authRouter=require('./routes/auth.routes')
var app = express();

//view engine setup;
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/', usersRouter);
///app.use('/',authRouter);

//catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

//error handler
app.use(function(err, req, res, next) {
 // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

 // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//////////////////////
// const router = require('./routes');

// class Server {

//   constructor() {
//     this.server = express();
//   }

//   setup(config) {
//     this.server.set('env', config.env);
//     this.server.set('hostname', config.hostname);
//     this.server.set('port', config.port);

//     this.server.set('views', config.viewDir);
//     this.server.set('view engine', 'ejs');

//     this.server.use(logger(config.env));
//     this.server.use(cors());
//     this.server.use(express.json());
//     this.server.use(express.urlencoded({ extended: false }));
//     this.server.use(cookieParser());
//     this.server.use(express.static(config.staticDir));

//     this.server.use('/', router);

//     this.server.use((req, res, next) => {
//       next(createError(404));
//     });

//     this.server.use((err, req, res, next) => {
//       res.locals.message = err.message;
//       res.locals.error = req.app.get('env') === 'dev' ? err : {};
//       res.status(err.status || 500);
//       res.render('error');
//     });

//   }

//   start() {
//     let hostname = this.server.get('hostname');
//     let port = this.server.get('port');
//     this.server.listen(port, () => {
//       console.log('Express server listening on - http://' + hostname + ':' + port);
//     });
//   }

// }

module.exports = app;

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var async = require("async");
process.config = require('./config');

var routes = require('./routes/index');
var placeholder = require('./routes/placeholder');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Register the required middleware as parallel to avoid synchroneous processing
function parallel(middlewares) {
    return function(req, res, next) {
        async.each(middlewares, function(mw, cb) {
            mw(req, res, cb);
        }, next);
    };
}

app.use(parallel([
    logger('dev'),
    bodyParser.json(),
    bodyParser.urlencoded({
        extended: false
    }),
    cookieParser()
]));


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/auth/placeholder', placeholder);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
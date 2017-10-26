var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');


var appRoutes = require('./routes/app');
var messagesRoutes = require('./routes/messages');
var userRoutes = require('./routes/user');

var app = express();
mongoose.connect('test:test@ds035643.mlab.com:35643/database_test', {useMongoClient: true});

// view engine setup
//tells express app where we keep our views and which view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
//tells you which folder is accesible everywhere (form internet) all the other ones are purely server side
//the static commands indicated that this folder holds the static content of our app
//(this public folder is the folder serving our application)
app.use(express.static(path.join(__dirname, 'public')));

//middleware preventing request from somewhere other than server
//these headers prevent problems when the server side code and front-end code are hosted on different servers
//they allow such a "double server" set up
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
    next();
});

//forwards any req to appRoutes variable (app.js file in routes folder)
//putting message first allows every request to go through it first than to appRoutes
app.use('/message', messagesRoutes);
app.use('/user', userRoutes);
app.use('/', appRoutes);

// catch 404 and forward to error handler
//not adding an err callback allows for angular and node to find the routes in the app.routing.ts file
//the err would prevent angular from "catching" the route before the err is returned/rendered
app.use(function (req, res, next) {
    return res.render('index');
});


module.exports = app;

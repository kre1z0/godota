var express =  require('express');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var favicon = require('serve-favicon');

var config = require('../config.json');
var error = require('./controllers/error');
var middlewares = require('./controllers/middlewares');
var router = require('./router/index');

var app = express();

// Passport.js auth
app.use(session({
    secret: config.secret_key,
    resave: true,
    saveUninitialized: true,
    cookie: { 
        httpOnly: false 
    }
}));
passport.use(middlewares.strategy());
app.use(passport.initialize());
app.use(passport.session());
middlewares.serialization(passport);
middlewares.deserialization(passport);

// Render templates
app.set('view engine', 'pug');
app.set('views', __dirname +  '/client/views');

// POST request and cookies
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// Favicon
app.use(favicon('./app/client/source/img/favicon.ico'));

// Static files
app.use('/src', express.static(__dirname + '/client/source'));

// Router
app.use('/', router);

//Errors
app.use(error.notFound);
app.use(error.renderError);

module.exports = app;
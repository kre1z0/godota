var express =  require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');

var error = require('./controllers/error');
var router = require('./router/index');

var app = express();

// Render templates
app.set('view engine', 'ejs');
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
var mongoose = require('mongoose');

var config = require('../../config.json');
var twitch = require('./twitch');
var youtube = require('./youtube');
var admin = require('./admin');
var news = require('./news');

var connection = mongoose.connection;

//connection check
connection.on('open', function() {
    console.log('Connection to DB created');
});
connection.on('error', function(err) {
    console.log('Failed to connect to DB!');
    console.log(err);
});

mongoose.connect('mongodb://localhost:' + config.db_port + '/' + config.database);

var models = {
    twitch,
    youtube,
    admin,
    news
};

module.exports = models;
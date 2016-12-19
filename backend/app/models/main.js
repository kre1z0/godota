var mongoose = require('mongoose');

var connection = mongoose.connection;

//connection check
connection.on('open', function() {
    console.log('Connection to DB created');
});
connection.on('error', function(err) {
    console.log('Error connect to DB!');
    console.log(err);
});
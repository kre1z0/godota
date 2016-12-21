var process = require('process');
var Models = require('../app/models/main');

var twitch = require('../../src/static/json/twitch.json');
var youtube = require('../../src/static/json/youtube.json');

function converting() {
    var allRequests = [];
    twitch.forEach(function(element) {
        allRequests.push(Models.twitch.create(element));
    });
    youtube.forEach(function(element) {
        allRequests.push(Models.youtube.create(element));
    });
    Promise.all(allRequests).then(() => {
        console.log('Success!');
        process.exit(0);
    }).catch((err) => {
        console.log('----------------------------------------------');
        console.log('Error:');
        console.log(err);
        console.log('----------------------------------------------');
    })
}

converting();
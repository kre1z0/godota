var process = require('process');
var md5 = require('md5');

var Models = require('./app/models/main');

function creating() {
    var login = process.argv[2];
    var pass = process.argv[3];

    if (!login || !pass) {
        console.log('----------------------------------------------');
        console.log('Incorrect name or password');
        console.log('Run new_user.js like this:');
        console.log('"node new_user.js Username Password"');
        console.log('----------------------------------------------');
        process.exit(1);
        return false;
    }

    Models.admin.create({
        login,
        pass: md5(pass)
    }).then(function() {
        console.log('User was created!');
        process.exit(0);
    }).catch(function(err) {
        console.log('----------------------------------------------');
        console.log('Database error:');
        console.log(err);
        console.log('----------------------------------------------');
        process.exit(1);
    });
}

creating();
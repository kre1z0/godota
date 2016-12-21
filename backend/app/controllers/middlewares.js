'use strict';

var LocalStrategy = require('passport-local').Strategy;
var md5 = require('md5');

var Models = require('../models/main');

class Middlewares {
    strategy() {
        return new LocalStrategy(function (username, password, done) {
            Models.admin.findOne({
                login: username
            }).then(function (user) {
                if (!user) {
                    return done(null, false);
                }
                var pass_hash = md5(password);
                if (user.pass != pass_hash) {
                    return done(null, false);
                }
                return done(null, user);
            }).catch(function (err) {
                console.log(err);
                return done(err);
            });
        });
    }

    serialization(passport) {
        return passport.serializeUser(function(user, done) {
            done(null, user._id);
        });
    }

    deserialization(passport) {
        return passport.deserializeUser(function(id, done) {
            Models.admin.findOne({
                _id: id
            }).then(function(user) {
                done(null, user);
            }).catch(function(err) {
                done(err);
            });
        });
    }
    
    check(req, res, next) {
        if (req.user) {
            next();
        }
        else {
            res.render('errors/e404');
        }
    }
}

var middlewareInstance = new Middlewares();

module.exports = middlewareInstance;
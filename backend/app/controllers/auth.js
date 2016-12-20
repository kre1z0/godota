'use strict';

var passport = require('passport');

class AuthController {
    login(req, res, next) {
        passport.authenticate('local', function(err, user) {
            if (err) {
                console.log(err);
                return res.redirect('/login?res=500');
            }
            else if (!user) {
                return res.redirect('/login?res=403');
            }
            req.logIn(user, function(err) {
                if (err) {
                    console.log(err);
                    return res.redirect('/login?res=500');
                }
                else {
                    return res.redirect('/');
                }
            });
        })(req, res, next);
    }

    logout(req, res, next) {
        req.logout();
        return res.redirect('/login');
    }
}

var AuthInstance = new AuthController();

module.exports = AuthInstance;
'use strict';

var Models = require('../models/main');

class TwitchController {
    index(req, res, next) {
        Models.twitch.find().then((twitch) => {
            twitch.reverse();
            res.render('twitch/index', {
                data: twitch,
                err: req.query.err
            });
        }).catch((err) => {
            res.render('errors/e500');
        });
    }

    addAction(req, res, next) {
        Models.twitch.create(req.body).then(() => {
            res.redirect('/twitch/');
        }).catch(() => {
            res.redirect('/twitch/?err=500');
        });
    }

    editAction(req, res, next) {
        var num = req.params.num;
        Models.twitch.update({
            _id: num
        }, req.body).then(() => {
            res.redirect('/twitch/');
        }).catch(() => {
            res.redirect('/twitch/?err=500');
        });
    }

    deleteAction(req, res, next) {
        var num = req.params.num;
        Models.twitch.findOneAndRemove({
            _id: num
        }).then(() => {
            res.redirect('/twitch/');
        }).catch(() => {
            res.redirect('/twitch/?err=500');
        });
    }
}

var TwitchInstance = new TwitchController();

module.exports = TwitchInstance;
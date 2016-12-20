'use strict';

var Models = require('../models/main');

class TwitchController {
    index(req, res, next) {
        Models.twitch.find().then((twitch) => {
            twitch.reverse();
            res.render('twitch/index', {
                twitch,
                err: req.query.err
            });
        }).catch((err) => {
            res.render('errors/e500');
        });
    }

    addAction() {
        Models.news.create({
            id: req.body.id,
            nickname: req.body.nick,
            country: req.body.country
        }).then(() => {
            res.redirect('/twitch/');
        }).catch(() => {
            res.redirect('/twitch/?err=500');
        });
    }

    editAction() {
        //
    }

    deleteAction() {
        //
    }
}

var TwitchInstance = new TwitchController();

module.exports = TwitchInstance;
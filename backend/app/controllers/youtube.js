'use strict';

var Models = require('../models/main');

class YoutubeController {
    index(req, res, next) {
        Models.youtube.find().then((youtube) => {
            youtube.reverse();
            res.render('youtube/index', {
                data: youtube,
                err: req.query.err
            });
        }).catch((err) => {
            res.render('errors/e500');
        });
    }

    addAction(req, res, next) {
        Models.youtube.create(req.body).then(() => {
            res.redirect('/youtube/');
        }).catch(() => {
            res.redirect('/youtube/?err=500');
        });
    }

    editAction(req, res, next) {
        var num = req.params.num;
        Models.youtube.update({
            _id: num
        }, req.body).then(() => {
            res.redirect('/youtube/');
        }).catch(() => {
            res.redirect('/youtube/?err=500');
        });
    }

    deleteAction(req, res, next) {
        var num = req.params.num;
        Models.youtube.findOneAndRemove({
            _id: num
        }).then(() => {
            res.redirect('/youtube/');
        }).catch(() => {
            res.redirect('/youtube/?err=500');
        });
    }
}

var YoutubeInstance = new YoutubeController();

module.exports = YoutubeInstance;
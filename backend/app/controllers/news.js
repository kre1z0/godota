'use strict';

var Models = require('../models/main');

class NewsController {
    index(req, res, next) {
        Models.news.find().then((news) => {
            news.reverse();
            res.render('news/index', {
                news,
                err: req.query.err
            });
        }).catch((err) => {
            res.send(this.responseFormat(err, true));
        });
    }

    addPage(req, res, next) {
        res.render('news/add');
    }

    editPage(req, res, next) {
        res.render('news/edit');
    }

    addAction(req, res, next) {
        Models.news.create({
            title: req.data.title,
            cover: req.data.cover,
            text: req.data.text,
            date: new Date()
        }).then(() => {
            res.redirect('/news/');
        }).catch(() => {
            res.redirect('/news/?err=500');
        });
    }

    editAction(req, res, next) {
        //
    }

    deleteAction(req, res, next) {
        //
    }
}

var NewsInstance = new NewsController();

module.exports = NewsInstance;
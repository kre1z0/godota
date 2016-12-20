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
        var num = req.params.num;
        Models.news.findById(num).then((news) => {
            res.render('news/edit', {
                news,
                err: req.query.err
            });
        }).catch(() => {
            res.render('errors/e404');
        });
    }

    addAction(req, res, next) {
        Models.news.create({
            title: req.body.title,
            cover: req.body.cover,
            text: req.body.text,
            date: new Date()
        }).then(() => {
            res.redirect('/news/');
        }).catch(() => {
            res.redirect('/news/?err=500');
        });
    }

    editAction(req, res, next) {
        var num = req.params.num;
        var date = new Date(req.body.date);

        if (isNaN(date)) {
            return res.redirect('/news/edit/' + num + '/?err=417');
        }

        Models.news.update({
            _id: num
        }, {
            title: req.body.title,
            cover: req.body.cover,
            text: req.body.text,
            date: date
        }).then(() => {
            res.redirect('/news/');
        }).catch((err) => {
            res.redirect('/news/?err=500');
        });
    }

    deleteAction(req, res, next) {
        var num = req.params.num;
        Models.news.findOneAndRemove({
            _id: num
        }).then(() => {
            res.redirect('/news/');
        }).catch((err) => {
            res.redirect('/news/?err=500');
        });
    }
}

var NewsInstance = new NewsController();

module.exports = NewsInstance;
'use strict';

var Models = require('../models/main');

class ApiController {
    getAllNews(req, res, next) {
        Models.news.find().then((news) => {
            news.reverse();
            res.send(this.responseFormat(news, false));
        }).catch((err) => {
            res.send(this.responseFormat(err, true));
        });
    }

    getAllYoutube(req, res, next) {
        Models.youtube.find().then((channels) => {
            channels.reverse();
            res.send(this.responseFormat(channels, false));
        }).catch((err) => {
            res.send(this.responseFormat(err, true));
        });
    }

    getAllTwitch(req, res, next) {
        Models.twitch.find().then((channels) => {
            channels.reverse();
            res.send(this.responseFormat(channels, false));
        }).catch((err) => {
            res.send(this.responseFormat(err, true));
        });
    }

    responseFormat(data, error) {
        var response = {
            error,
            data
        };
        return JSON.stringify(response);
    }
}

var ApiInstance = new ApiController();

module.exports = ApiInstance;
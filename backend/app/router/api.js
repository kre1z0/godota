var express = require('express');
var api = require('../controllers/api');

var router = express.Router();

router.get('/all_news', api.getAllNews.bind(api));
router.get('/all_twitch', api.getAllTwitch.bind(api));
router.get('/all_youtube', api.getAllYoutube.bind(api));

module.exports = router;
var express = require('express');

var index = require('../controllers/index');
var middlewares = require('../controllers/middlewares');
var auth = require('./auth');
var api = require('./api');
var news = require('./news');
var twitch = require('./twitch');
var youtube = require('./youtube');

var router = express.Router();

// Index
router.get('/', index.index);
router.get('/login', index.login);

router.use('/auth', auth);
router.use('/api', api);
router.use('/news', middlewares.check, news);
router.use('/twitch', middlewares.check, twitch);
router.use('/youtube', middlewares.check, youtube);

module.exports = router;
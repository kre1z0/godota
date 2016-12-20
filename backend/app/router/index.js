var express = require('express');

var index = require('../controllers/index');
var auth = require('./auth');
var api = require('./api');
var news = require('./news');
var twitch = require('./twitch');

var router = express.Router();

// Index
router.get('/', index.index);
router.get('/login', index.login);

router.use('/auth', auth);
router.use('/api', api);
router.use('/news', news);
router.use('/twitch', twitch);

module.exports = router;
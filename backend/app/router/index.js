var express = require('express');

var index = require('../controllers/index');
var auth = require('./auth');
var api = require('./api');

var router = express.Router();

// Index
router.get('/', index.index);
router.get('/login', index.login);

router.use('/auth', auth);
router.use('/api', api);

module.exports = router;
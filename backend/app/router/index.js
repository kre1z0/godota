var express = require('express');

var auth = require('./auth');
var index = require('../controllers/index');

var router = express.Router();

// Index
router.get('/', index.index);
router.get('/login', index.login);

router.use('/auth', auth);

module.exports = router;
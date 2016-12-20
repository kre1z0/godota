var express = require('express');
var auth = require('../controllers/auth');

var router = express.Router();

router.post('/login', auth.login);
router.post('/logout', auth.logout);

module.exports = router;
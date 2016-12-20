var express = require('express');
var twitch = require('../controllers/twitch');

var router = express.Router();

router.get('/', twitch.index);
router.post('/add', twitch.addAction);
router.post('/edit/:num', twitch.editAction);
router.post('/delete/:num', twitch.deleteAction);

module.exports = router;
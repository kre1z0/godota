var express = require('express');
var youtube = require('../controllers/youtube');

var router = express.Router();

router.get('/', youtube.index);
router.post('/add', youtube.addAction);
router.post('/edit/:num', youtube.editAction);
router.post('/delete/:num', youtube.deleteAction);

module.exports = router;
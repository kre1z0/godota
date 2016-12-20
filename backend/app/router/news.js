var express = require('express');
var news = require('../controllers/news');

var router = express.Router();

router.get('/', news.index);
router.get('/add', news.addPage);
router.get('/edit/:num', news.editPage);
router.post('/add', news.addAction);
router.post('/edit/:num', news.editAction);
router.get('/delete/:num', news.deleteAction);

module.exports = router;
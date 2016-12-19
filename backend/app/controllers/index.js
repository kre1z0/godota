'use strict';

class IndexController {
    index (req, res, next) {
        res.render('base.ejs');
    }
}

var router = new IndexController();

module.exports = router;
'use strict';

class IndexController {
    index (req, res, next) {
        if (!req.user) {
            res.redirect('/login');
        } else {
            res.render('base/cabinet');
        }
    }

    login (req, res, next) {
        if (!req.user) {
            res.render('base/login', {
                error: req.query.res
            });
        } else {
            res.redirect('/');
        }
    }
}

var router = new IndexController();

module.exports = router;
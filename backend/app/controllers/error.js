'use strict';

class ErrorController {
    notFound(req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    }

    serverError(req, res, next) {
        var err = new Error('Server Error');
        err.status = 500;
        next(err);
    }

    renderError(err, req, res, next) {
        console.log(err);
        res.status(err.status || 500);
        var err_num = err.status || 500;
        res.render('errors/e' + err_num);
    }
}

var router = new ErrorController();

module.exports = router;
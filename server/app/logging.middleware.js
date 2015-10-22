'use strict';

var router = require('express').Router(),
	morgan = require('morgan');

router.use(function (req, res, next) {
	console.log('req.user')
	console.log(req.user);
	if (!req.session.userId) console.log('Not logged in');
	else console.log('req.session.userId: ', req.session.userId);
  	next();
});

router.use(morgan(':method :url :status :response-time ms - :res[content-length]'));

module.exports = router;
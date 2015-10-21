'use strict';

var router = require('express').Router(),
	morgan = require('morgan');

router.use(function (req, res, next) {
	if (!req.session.userId) console.log('Not logged in');
	else console.log('UserId: ', req.session.userId);
  	next();
});

router.use(morgan(':method :url :status :response-time ms - :res[content-length]'));

module.exports = router;
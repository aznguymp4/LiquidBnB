const router = require('express').Router();
const { restoreUser } = require('../../utils/auth.js');

router.use(restoreUser);

[
	'session',
	'users',
	'spots',
	'spot-images',
	'reviews',
	'review-images',
	'bookings'
].map(route => router.use('/'+route, require(`./${route}.js`)))

module.exports = router;
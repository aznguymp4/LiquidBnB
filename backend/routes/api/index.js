const router = require('express').Router();
const { restoreUser } = require('../../utils/auth.js');

router.use(restoreUser);

[
	'session',
	'users',
	'spots',
	'spot-images'
].map(route => router.use('/'+route, require(`./${route}.js`)))

router.post('/test', (req, res) => {
	res.json({ requestBody: req.body });
});

module.exports = router;
const router = require('express').Router();
const { restoreUser } = require('../../utils/auth.js');

router.use(restoreUser);

router.use('/session', require('./session.js'));
router.use('/users', require('./users.js'));
router.use('/spots', require('./spots.js'));

router.post('/test', (req, res) => {
	res.json({ requestBody: req.body });
});

module.exports = router;
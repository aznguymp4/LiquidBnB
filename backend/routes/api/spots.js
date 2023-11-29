const express = require('express');
const router = express.Router();
const { User, Spot, SpotImage } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

router.get('/', async (req,res) => {
  res.json({
    Spots: await Spot.findAll()
  })
})

router.get('/current', requireAuth, async (req,res) => {
	const { user } = req;

  res.json({
    Spots: await Spot.findAll({
      where: { ownerId: user.id }
    })
  })
})

router.get('/:spotId', async (req,res) => {
  const { spotId } = req.params
  const specificSpot = await Spot.findByPk(spotId, {
    include: [
      {model: SpotImage},
      {model: User.scope('spotOwner'), as: 'Owner'}
    ]
  })
  if(!specificSpot) res.status(404)
  res.json(specificSpot || {message: "Spot couldn't be found"})
})

module.exports = router;
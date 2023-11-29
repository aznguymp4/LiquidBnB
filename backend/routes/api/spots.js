const express = require('express');
const router = express.Router();
const { User, Spot, SpotImage } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');

const spotNotFound = `Spot couldn't be found`

const validateSpotCreate = [
  check('address')
    .exists({ checkFalsy: true }).withMessage('Street address is required')
    .isString().withMessage('body.address must be a string'),
  check('city')
    .exists({ checkFalsy: true }).withMessage('City is required')
    .isString().withMessage('body.city must be a string'),
  check('state')
    .exists({ checkFalsy: true }).withMessage('State is required')
    .isString().withMessage('body.state must be a string'),
  check('country')
    .exists({ checkFalsy: true }).withMessage('Country is required')
    .isString().withMessage('body.country must be a string'),
  check('lat')
    .exists({ checkFalsy: true }).withMessage('Latitude is not valid')
    .not().isString().withMessage('body.lat must be a number'),
  check('lng')
    .exists({ checkFalsy: true }).withMessage('Longitude is not valid')
    .not().isString().withMessage('body.lng must be a number'),
  check('name')
    .exists({ checkFalsy: true })
    .isLength({max: 50}).withMessage('Name must be less than 50 characters')
    .isString().withMessage('body.name must be a string'),
  check('description')
    .exists({ checkFalsy: true }).withMessage('Description is required')
    .isString().withMessage('body.description must be a string'),
  check('price')
    .exists({ checkFalsy: true }).withMessage('Price per day is require')
    .not().isString().withMessage('body.price must be a number'),
  handleValidationErrors
];

router.get('/', async (req,res) => {
  res.json({
    Spots: await Spot.findAll()
  })
})

router.get('/current', requireAuth, async (req,res) => {
	const { user } = req
  
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
  res.json(specificSpot || {message: spotNotFound})
})

router.post('/', requireAuth, validateSpotCreate, async (req,res) => {
  const { user } = req
  req.body.ownerId = user.id
  const newSpot = await Spot.create(req.body)
  
  res.json(newSpot)
})

module.exports = router;
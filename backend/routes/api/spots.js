const express = require('express');
const router = express.Router();
const { User, Spot, SpotImage } = require('../../db/models');
const { Op } = require("sequelize");
const { body, query } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const { checkSpotExists, checkSpotExistsAndBelongsToUser } = require('../../utils/validateReqBody');

const validateSpotCreate = [
  body('address')
    .exists({ checkFalsy: true }).withMessage('Street address is required')
    .isString().withMessage('body.address must be a string'),
  body('city')
    .exists({ checkFalsy: true }).withMessage('City is required')
    .isString().withMessage('body.city must be a string'),
  body('state')
    .exists({ checkFalsy: true }).withMessage('State is required')
    .isString().withMessage('body.state must be a string'),
  body('country')
    .exists({ checkFalsy: true }).withMessage('Country is required')
    .isString().withMessage('body.country must be a string'),
  body('lat')
    .exists({ checkFalsy: true }).withMessage('Latitude is not valid')
    .not().isString().withMessage('body.lat must be a number'),
  body('lng')
    .exists({ checkFalsy: true }).withMessage('Longitude is not valid')
    .not().isString().withMessage('body.lng must be a number'),
  body('name')
    .exists({ checkFalsy: true })
    .isLength({max: 50}).withMessage('Name must be less than 50 characters')
    .isString().withMessage('body.name must be a string'),
  body('description')
    .exists({ checkFalsy: true }).withMessage('Description is required')
    .isString().withMessage('body.description must be a string'),
  body('price')
    .exists({ checkFalsy: true }).withMessage('Price per day is required')
    .not().isString().withMessage('body.price must be a number'),
  handleValidationErrors
];
const validateSpotImageCreate = [
  body('url')
    .exists({ checkFalsy: true }).withMessage('URL is required')
    .isString().withMessage('body.url must be a string')
    .isURL().withMessage('body.url must be a valid URL'),
  body('preview')
    .exists().withMessage('Preview is required (boolean)')
    .isBoolean().withMessage('body.preview must be a boolean'),
  handleValidationErrors
];
const validateSpotQueryFilter = [
  query('page')
    .toInt()
    .customSanitizer(v => Math.max(1, Math.min(10, v)))
    .isInt().withMessage('Page must be greater than or equal to 1')
    .default(1),
  query('size')
    .toInt()
    .customSanitizer(v => Math.max(1, Math.min(20, v)))
    .isInt().withMessage('Size must be greater than or equal to 1')
    .default(20),
  query('minLat')
    .isDecimal().withMessage('Maximum latitude is invalid')
    .toFloat(),
  query('maxLat')
    .isDecimal().withMessage('Minimum latitude is invalid')
    .toFloat(),
  query('minLng')
    .isDecimal().withMessage('Maximum longitude is invalid')
    .toFloat(),
  query('maxLng')
    .isDecimal().withMessage('Minimum longitude is invalid')
    .toFloat(),
  query('minPrice')
    .isFloat({ min: 0 }).withMessage('Minimum price must be greater than or equal to 0')
    .toFloat(),
  query('maxPrice')
    .isFloat({ min: 0 }).withMessage('Maximum price must be greater than or equal to 0')
    .toFloat(),
]

// Get all Spots
router.get('/', validateSpotQueryFilter, async (req,res) => {
  const q = req.query

  const where = {};
  // Range-based Queries (DRY version of this: https://pbs.twimg.com/media/GAJFwBpXoAAnJc6?format=jpg)
  ['lat','lng','price'].map(key => {
    const Key = key[0].toUpperCase() + key.slice(1)
    const [minK, maxK] = ['min'+Key, 'max'+Key]
    if(q[minK] || q[maxK]) {
      where[key] = {}
      if(q[minK]) where[key][Op.gte] = q[minK]
      if(q[maxK]) where[key][Op.lte] = q[maxK]
    }
  })

  res.json({
    Spots: (await Spot.findAll({
      where,
      include: SpotImage,
      offset: q.size * (q.page - 1),
      limit: q.size
    })).map(spot => {
      let s = spot.toJSON()
      const firstPreview = s.SpotImages.filter(i=>i.preview)[0]
      s.previewImage = firstPreview?.url || ''
      delete s.SpotImages
      return s
    }),
    page: q.page,
    size: q.size
  })
})

// Get all Spots owned by the Current User
router.get('/current', requireAuth, async (req,res) => {  
  res.json({
    Spots: await Spot.findAll({ where: { ownerId: req.user.id } })
  })
})

// Get details of a Spot from an id
router.get('/:spotId', checkSpotExists, async (req,res) => {
  const { spotId } = req.params
  res.json(await Spot.findByPk(spotId, {
    include: [
      SpotImage,
      {model: User.scope('spotOwner'), as: 'Owner'}
    ]
  }))
})

// Create a Spot
router.post('/', requireAuth, validateSpotCreate, async (req,res) => {
  const { user } = req
  req.body.ownerId = user.id
  res.json(await Spot.create(req.body))
})

// Edit a Spot
router.put('/:spotId', requireAuth, checkSpotExistsAndBelongsToUser, validateSpotCreate, async (req,res) => {
  const { spot } = req
  await spot.update(req.body)
  res.json(spot)
})

// Delete a Spot
router.delete('/:spotId', requireAuth, checkSpotExistsAndBelongsToUser, async (req,res) => {
  const { spot } = req
  await spot.destroy()
  res.json({message: 'Successfully deleted'})
})

// Add an Image to a Spot based on the Spot's id
router.post('/:spotId/images', requireAuth, checkSpotExistsAndBelongsToUser, validateSpotImageCreate, async (req,res) => {
  req.body.spotId = req.params.spotId
  const newImage = await SpotImage.create(req.body)
  res.json(newImage)
})

module.exports = router;
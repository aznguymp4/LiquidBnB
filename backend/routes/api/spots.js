const express = require('express');
const router = express.Router();
const { Sequelize, Op } = require("sequelize");
const { User, Spot, SpotImage, Review, ReviewImage, Booking } = require('../../db/models');
const { createError } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const vrb = require('../../utils/validateReqBody');
const bqv = require('../../utils/bodyQueryValidators');
const agg = require('../../utils/aggregate');

// Get all Spots
router.get('/', (r,_,n)=>{r.originalQuerySize=Object.keys(r.query).length;n()}, bqv.validateSpotQueryFilter, async (req,res,next) => {
  const q = req.query
  // if(q.page<1||q.page>10) throw new Error('Page must be greater than or equal to 1')
  // if(q.size<1||q.size>20) throw new Error('Size must be greater than or equal to 1')
  
  const where = {}
  // Range-based Queries (DRY version of this: https://pbs.twimg.com/media/GAJFwBpXoAAnJc6?format=jpg)
  ;['lat','lng','price'].map(key => {
    const Key = key[0].toUpperCase() + key.slice(1)
    const [minK, maxK] = ['min'+Key, 'max'+Key]
    if(q[minK] || q[maxK]) {
      where[key] = {}
      if(q[minK]) where[key][Op.gte] = q[minK]
      if(q[maxK]) where[key][Op.lte] = q[maxK]
    }
  })
  const obj = {
    Spots: agg.previewImage(agg.avgRating(await Spot.findAll({
      where,
      include: [SpotImage, Review],
      offset: q.size * (q.page - 1),
      limit: q.size
    }), true))
  }
  if(req.originalQuerySize) {
    obj.page = q.page,
    obj.size = q.size
  }
  res.json(obj)
})

// Get all Spots owned by the Current User
router.get('/current', requireAuth, async (req,res) => {  
  res.json({
    Spots: agg.previewImage(agg.avgRating(await Spot.findAll({
      where: { ownerId: req.user.id },
      include: [SpotImage, Review]
    }), true))
  })
})

// Get details of a Spot from an id
router.get('/:spotId', async (req,res,next) => {
  const { spotId } = req.params
  const spot = await Spot.findByPk(spotId, {
    attributes: {
      include: [
        [Sequelize.fn('COUNT', Sequelize.col('Reviews.id')), 'numReviews'],
        [Sequelize.fn('AVG', Sequelize.col('Reviews.stars')), 'avgRating']
      ]
    },
    include: [
      SpotImage,
      {model: Review, attributes: []},
      {model: User.scope('noUsername'), as: 'Owner'}
    ]
  })
  if(!spot.id) return next(createError(`Spot couldn't be found`, 404))
  res.json(spot)
})

// Create a Spot
router.post('/', requireAuth, bqv.validateSpotCreate, async (req,res) => {
  const { user } = req
  req.body.ownerId = user.id
  res.status(201).json(await Spot.create(req.body))
})

// Edit a Spot
router.put('/:spotId', requireAuth, vrb.checkSpotExistsAndBelongsToUser, bqv.validateSpotCreate, async (req,res) => {
  const { spot } = req
  await spot.update(req.body)
  res.json(spot)
})

// Delete a Spot
router.delete('/:spotId', requireAuth, vrb.checkSpotExistsAndBelongsToUser, async (req,res) => {
  const { spot } = req
  await spot.destroy({ where: { id: spot.id } }) // For some reason it doesn't work half the time without the where??
  res.json({message: 'Successfully deleted'})
})

// Add an Image to a Spot based on the Spot's id
router.post('/:spotId/images', requireAuth, vrb.checkSpotExistsAndBelongsToUser, bqv.validateSpotImageCreate, async (req,res) => {
  req.body.spotId = req.params.spotId
  const newImage = await SpotImage.create(req.body)
  const {id,url,preview} = newImage
  res.json({id,url,preview})
})

// Get all Reviews by a Spot's id
router.get('/:spotId/reviews', vrb.checkSpotExists, async (req,res) => {
  const { spot } = req
  res.json({
    Reviews: await Review.findAll({
      where: {spotId: spot.id},
      include: [ User.scope('noUsername'), ReviewImage ]
    })
  })
})

// Create a Review for a Spot based on the Spot's id
router.post('/:spotId/reviews', requireAuth, vrb.checkSpotExists, bqv.validateReviewCreate, async (req,res,next) => {
  const [userId,spotId] = [req.user.id,req.spot.id]
  if(await Review.findOne({ where: { spotId, userId } })) return next(createError('User already has a review for this spot', 500))

  const newReview = await Review.create({ userId, spotId, ...req.body })
  res.status(201).json(newReview)
})

// Get all Bookings for a Spot based on the Spot's id
router.get('/:spotId/bookings', requireAuth, vrb.checkSpotExists, async (req,res) => {
  const { spotId } = req.params
  const userOwnsSpot = req.user.id === req.spot.ownerId

  res.json({
    Bookings: await ((userOwnsSpot? Booking.unscoped() : Booking).findAll({
      include: userOwnsSpot? [ User.scope('noUsername') ] : [],
      where: { spotId }
    }))
  })
})

// Create a Booking from a Spot based on the Spot's id
router.post('/:spotId/bookings', requireAuth, (r,_,n)=>{r.invertOwn=true;n()}, vrb.checkSpotExistsAndBelongsToUser, bqv.validateBookingCreate, async (req,res) => {
  const { user, spot } = req

  const newBooking = await Booking.create({ userId: user.id, spotId: spot.id, ...req.body })
  res.json(newBooking)
})

module.exports = router;
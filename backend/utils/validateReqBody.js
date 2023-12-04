const { User, Spot, SpotImage, Review, ReviewImage, Booking } = require('../db/models');
const { createError } = require('./validation')
const x = undefined

module.exports = {
	checkSpotExists: async (req, res, next) => {
		const { spotId } = req.params
    req.spot = await Spot.findByPk(spotId)
    
    return next(!req.spot? createError(`Spot couldn't be found`, 404) : x)
	},
	checkSpotExistsAndBelongsToUser: async (req, res, next) => {
    const { user } = req
    req.spot = await Spot.findByPk(req.params.spotId)
    if(!req.spot) return next(createError(`Spot couldn't be found`, 404))
    
    return next(
      (user.id!==req.spot.ownerId)+(req.invertOwn?-1:0)?
      createError(frbdn, 401)
      : x
    )
  },
  checkSpotImageExistsAndBelongsToUser: async (req, res, next) => {
    const { user } = req
    req.spotImage = await SpotImage.unscoped().findByPk(req.params.imageId)
    if(!req.spotImage) return next(createError(`Spot Image couldn't be found`, 404))
    req.spot = await Spot.findByPk(req.spotImage.spotId)
    if(!req.spot) return next(createError(`Spot associated with Spot Image couldn't be found`, 404))

    return next(req.spot.ownerId !== user.id? createError(frbdn, 401) : x)
	},

  checkReviewExistsAndBelongsToUser: async (req, res, next) => {
    const { user } = req
    req.review = await Review.findByPk(req.params.reviewId, req.includeImages? {include: [ReviewImage]} : undefined)

    if(!req.review) return next(createError(`Review couldn't be found`, 404))
    return next(user.id!==req.review.userId? createError(frbdn, 401) : x)
  },
  checkReviewImageExistsAndBelongsToUser: async (req, res, next) => {
    const { user } = req
    req.reviewImage = await ReviewImage.unscoped().findByPk(req.params.imageId)
    if(!req.reviewImage) return next(createError(`Review Image couldn't be found`, 404))
    req.review = await Review.findByPk(req.reviewImage.reviewId)
    if(!req.review) return next(createError(`Review associated with Review Image couldn't be found`, 404))

    return next(req.review.userId !== user.id? createError(frbdn, 401) : x)
	},
  checkBookingExistsAndBelongsToUser: async (req, res, next) => {
    const { user } = req
    req.booking = await Booking.unscoped().findByPk(req.params.bookingId)

    if(!req.booking) return next(createError(`Booking couldn't be found`, 404))
    return next(req.booking.userId !== user.id? createError(frbdn, 401) : x)
	},
};
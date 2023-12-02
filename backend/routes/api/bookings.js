const express = require('express');
const router = express.Router();
const { Spot, SpotImage, Booking } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { createError } = require('../../utils/validation');
const bqv = require('../../utils/bodyQueryValidators');
const vrb = require('../../utils/validateReqBody');
const agg = require('../../utils/aggregate');

// Get all of the Current User's Bookings
router.get('/current', requireAuth, async (req,res) => {
	res.json({
		Bookings: agg.previewImage(await Booking.unscoped().findAll({
			include: [{
				model: Spot.scope('basicView'),
				include: SpotImage
			}],
			where: { userId: req.user.id }
		}),true,true)
	})
})

// Edit a Booking
router.put('/:bookingId', requireAuth, vrb.checkBookingExistsAndBelongsToUser, bqv.validateBookingCreate, async (req,res) => {
  const { booking } = req
  if(booking.endDate < new Date()) return res.status(403).json({message: "Past bookings can't be modified"})
  await booking.update(req.body)
  res.json(booking)
})

// Delete a Booking
router.delete('/:bookingId', requireAuth, async(req,res,next) => {
  // Check that the Booking or Spot belongs to the current user
  const { user } = req
  const booking = await Booking.unscoped().findByPk(req.params.bookingId, { include: [Spot] })

  if(!booking) return next(createError(`Booking couldn't be found`, 404))
  if(![booking.userId,booking.Spot.ownerId].includes(user.id)) return next(createError('Booking or Spot does not belong to this user!', 401))
  if(booking.startDate < new Date()) return next(createError("Bookings that have been started can't be deleted", 403))

  await booking.destroy()
  res.json({message: 'Successfully deleted'})
})

module.exports = router;
const express = require('express');
const router = express.Router();
const { User, Spot, SpotImage, Review, ReviewImage } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { createError } = require('../../utils/validation');
const vrb = require('../../utils/validateReqBody');
const bqv = require('../../utils/bodyQueryValidators');

// Get all Reviews of the Current User
router.get('/current', requireAuth, async (req,res) => {
	res.json({
    Reviews: (await Review.findAll({
      where: { userId: req.user.id },
      include: [
        User.scope('noUsername'),
        {
          model: Spot,
          attributes: { exclude: ['description', 'createdAt', 'updatedAt'] },
          include: SpotImage
        },
        ReviewImage ]
    })).map(review => {
      let r = review.toJSON()
      const firstPreview = r.Spot.SpotImages.filter(i=>i.preview)[0]
      r.Spot.previewImage = firstPreview?.url || ''
      delete r.Spot.SpotImages
      return r
    })
  })
})

// Add an Image to a Review based on the Review's id
router.post('/:reviewId/images', requireAuth, (r,_,n)=>{r.includeImages=true;n()}, vrb.checkReviewExistsAndBelongsToUser, bqv.validateReviewImageCreate, async (req,res,next) => {
  if(req.review.ReviewImages.length >= 10) return next(createError('Maximum number of images for this resource was reached', 403))
  const { reviewId } = req.params
  const newImage = await ReviewImage.create({
    reviewId,
    ...req.body
  })
  res.json({id: newImage.id, url: newImage.url})
})

// Edit a Review
router.put('/:reviewId', requireAuth, vrb.checkReviewExistsAndBelongsToUser, bqv.validateReviewCreate, async (req,res) => {
  const { review } = req
  await review.update(req.body)
  res.json(review)
})

// Delete a Review
router.delete('/:reviewId', requireAuth, vrb.checkReviewExistsAndBelongsToUser, async (req,res) => {
  const { review } = req
  await review.destroy()
  res.json({message: 'Successfully deleted'})
})

module.exports = router;
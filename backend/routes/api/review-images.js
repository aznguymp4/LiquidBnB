const express = require('express');
const router = express.Router();
// const { Review, ReviewImage } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
// const { createError } = require('../../utils/validation');
const vrb = require('../../utils/validateReqBody');
const bqv = require('../../utils/bodyQueryValidators');

// Delete a Review Image
router.delete('/:imageId', requireAuth, vrb.checkReviewImageExistsAndBelongsToUser, async (req,res) => {
  await req.reviewImage.destroy()
  res.json({ message: 'Successfully deleted' })
})

module.exports = router;
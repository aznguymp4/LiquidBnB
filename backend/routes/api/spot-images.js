const express = require('express');
const router = express.Router();
const { requireAuth } = require('../../utils/auth');
const vrq = require('../../utils/validateReqBody');
// const { SpotImage } = require('../../db/models');

// Delete a Spot Image
router.delete('/:imageId', requireAuth, vrq.checkSpotImageExistsAndBelongsToUser, async (req,res)=>{
  await req.spotImage.destroy()
  res.json({ message: 'Successfully deleted' })
})

module.exports = router;
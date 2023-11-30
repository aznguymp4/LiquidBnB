const express = require('express');
const router = express.Router();
const { requireAuth } = require('../../utils/auth');
const { checkSpotImageExistsAndBelongsToUser } = require('../../utils/validateReqBody');
// const { SpotImage } = require('../../db/models');

router.delete('/:imageId', requireAuth, checkSpotImageExistsAndBelongsToUser, async (req,res)=>{
  await req.spotImage.destroy()
  res.json({ message: 'Successfully deleted' })
})

module.exports = router;
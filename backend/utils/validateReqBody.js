const { User, Spot, SpotImage } = require('../db/models');
const x = undefined

const createError = (message, status) => {
  const err = new Error(message)
  err.title = message
  err.errors = { message }
  err.status = status
  return err
}

module.exports = {
	checkSpotExists: async (req, res, next) => {
		const { spotId } = req.params
    req.spot = await Spot.findByPk(spotId)
    
    return next(!req.spot? createError(`Spot couldn't be found`, 404) : x)
	},
	checkSpotExistsAndBelongsToUser: async (req, res, next) => {
    const { user } = req
		const { spotId } = req.params
    req.spot = await Spot.findByPk(spotId)

    if(!req.spot) return next(createError(`Spot couldn't be found`, 404))
    return next(user.id!==req.spot.ownerId? createError('Attempted to modify Spot of another user', 401) : x)
},
checkSpotImageExistsAndBelongsToUser: async (req, res, next) => {
    const { user } = req
    req.spotImage = await SpotImage.unscoped().findByPk(req.params.imageId)
    if(!req.spotImage) return next(createError(`Spot Image couldn't be found`, 404))
    req.spot = await Spot.findByPk(req.spotImage.spotId)
    if(!req.spot) return next(createError(`Spot associated with Spot Image couldn't be found`, 404))

    return next(req.spot.ownerId !== user.id? createError('Attempted to modify Spot Image of another user', 401) : x)
	}
};
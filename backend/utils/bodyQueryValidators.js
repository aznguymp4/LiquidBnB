const { body, query } = require('express-validator');
const { handleValidationErrors } = require('./validation');

module.exports = {
	validateSpotCreate: [
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
	],
	validateSpotImageCreate: [
		body('url')
			.exists({ checkFalsy: true }).withMessage('URL is required')
			.isString().withMessage('body.url must be a string')
			.isURL().withMessage('body.url must be a valid URL'),
		body('preview')
			.exists().withMessage('Preview is required (boolean)')
			.isBoolean().withMessage('body.preview must be a boolean'),
		handleValidationErrors
	],
	validateSpotQueryFilter: [
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
	],
	validateReviewCreate: [
		body('review')
			.exists({ checkFalsy: true })
			.withMessage('Review text is required'),
		body('stars')
			.toInt()
			.customSanitizer(v => Math.max(1, Math.min(5, v)))
			.isInt().withMessage('Stars must be an integer from 1 to 5'),
		handleValidationErrors
	],
	validateReviewImageCreate: [
		body('url')
			.exists({ checkFalsy: true }).withMessage('URL is required')
			.isString().withMessage('body.url must be a string')
			.isURL().withMessage('body.url must be a valid URL'),
		handleValidationErrors
	],
}
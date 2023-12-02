const { body, query } = require('express-validator');
const { handleValidationErrors } = require('./validation');
const { createError } = require('./validation');
const { Booking } = require('../db/models')
const { Op } = require("sequelize");
const dateRegex = /^\d{4}-((((0[13578])|(1[02]))-(([0-2][0-9])|(3[01])))|(((0[469])|(11))-(([0-2][0-9])|(30)))|(02-[0-2][0-9]))$/gm // https://regex101.com/r/pQnOGW/1

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
			.exists({ checkFalsy: true }).isFloat({ min:-180, max:180 }).withMessage('Latitude is not valid')
			.not().isString().withMessage('body.lat must be a number'),
		body('lng')
			.exists({ checkFalsy: true }).isFloat({ min:-180, max:180 }).withMessage('Longitude is not valid')
			.not().isString().withMessage('body.lng must be a number'),
		body('name')
			.exists({ checkFalsy: true })
			.isLength({max: 50}).withMessage('Name must be less than 50 characters')
			.isString().withMessage('body.name must be a string'),
		body('description')
			.exists({ checkFalsy: true }).withMessage('Description is required')
			.isString().withMessage('body.description must be a string'),
		body('price')
			.exists({ checkFalsy: true }).custom(v=>!isNaN(v) && v>0).withMessage('Price per day is required')
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
			// .customSanitizer(v => Math.max(1, Math.min(10, v)))
			.isInt({ min: 1, max: 10 }).withMessage('Page must be greater than or equal to 1')
			.default(1),
		query('size')
			.toInt()
			// .customSanitizer(v => Math.max(1, Math.min(20, v)))
			.isInt({ min: 1, max: 20 }).withMessage('Size must be greater than or equal to 1')
			.default(20),
		query('minLat')
			.isFloat({ min: -180, max: 180 }).withMessage('Maximum latitude is invalid')
			.toFloat(),
		query('maxLat')
			.isFloat({ min: -180, max: 180 }).withMessage('Minimum latitude is invalid')
			.toFloat(),
		query('minLng')
			.isFloat({ min: -180, max: 180 }).withMessage('Maximum longitude is invalid')
			.toFloat(),
		query('maxLng')
			.isFloat({ min: -180, max: 180 }).withMessage('Minimum longitude is invalid')
			.toFloat(),
		query('minPrice')
			.isFloat({ min: 0 }).withMessage('Minimum price must be greater than or equal to 0')
			.toFloat(),
		query('maxPrice')
			.isFloat({ min: 0 }).withMessage('Maximum price must be greater than or equal to 0')
			.toFloat(),
		handleValidationErrors
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
			.isString().withMessage('body.url must be a string'),
			// .isURL().matches(/\.\w{1,}$/).withMessage('body.url must be a valid URL'),
		handleValidationErrors
	],
	validateBookingCreate: [
		body('startDate')
			.exists({ checkFalsy: true }).withMessage('Start Date is required')
			.matches(dateRegex).withMessage('body.startDate must be a valid date (YYYY-MM-DD)')
			.custom(start=>new Date(start) > new Date()).withMessage('startDate cannot be in the past'),
			body('endDate')
			.exists({ checkFalsy: true }).withMessage('end Date is required')
			.matches(dateRegex).withMessage('body.endDate must be a valid date (YYYY-MM-DD)')
			.custom((end,{req})=>req.body.startDate<end).withMessage('endDate cannot be on or before startDate')
			.custom(end=>new Date(end) > new Date()).withMessage('endDate cannot be in the past'),
		handleValidationErrors,
		async (r,res,n) => {
			const parsed = {}
			const invalid = ['startDate','endDate'].map(p => {
				const date = r.body[p]
				const d8 = new Date(date)
				const [y,m,d] = date.split('-').map(a=>parseInt(a))
				const valid 
				=	(parseInt(d8.getUTCFullYear()) === y)
				&&  (parseInt(d8.getUTCMonth()) === m-1)
				&&  (parseInt(d8.getUTCDate()) === d)
				parsed[p.replace('Date','')] = d8
				return valid? undefined : p
			}).filter(Boolean)
			if(invalid.length) return n(createError(`${invalid.join(' && ')} format is correct but date is not valid`, 400))
			
			parsed.start.setUTCHours(0,0,0,0); parsed.end.setUTCHours(23,59,59,999)
			// ^^^ Make start and end dates take up all the time in those set days
			// This is necessary, because normally the same dates with different times wouldn't be considered conflicting
			// Example: 2023-01-01 12:00 and 2023-01-01 15:00 are different times, but are considered the same day and will return a booking confict error
			
			const dateRangeCheck = { [Op.between]: [parsed.start, parsed.end] }

			// Check if dates conflict with existing bookings
			const conflict = await Booking.unscoped().findOne({where:{[Op.and]:{[Op.not]:{id:r.params.bookingId || 0},[Op.or]:{[Op.or]:{startDate:dateRangeCheck,endDate:dateRangeCheck},[Op.and]:{startDate:{[Op.lte]:parsed.start},endDate:{[Op.gte]:parsed.end}}}}}})
			if(conflict) {
				console.log(conflict.toJSON())
				conflict.startDate.setUTCHours(0,0,0,0); conflict.endDate.setUTCHours(23,59,59,999)
				const errors = {}
				const [s,e] = [conflict.startDate <= parsed.start, conflict.endDate >= parsed.end]

				if(s||!e) errors.startDate = "Start date conflicts with an existing booking"
				if(e||!s) errors.endDate = "End date conflicts with an existing booking"

				return res.status(403).json({message: "Sorry, this spot is already booked for the specified dates", errors})
			}
		n()}
	]
}
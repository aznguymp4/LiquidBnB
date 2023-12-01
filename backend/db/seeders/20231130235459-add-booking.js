'use strict';
const { Booking } = require('../models');
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
const tenDaysFromNow = new Date()
tenDaysFromNow.setDate(tenDaysFromNow.getDate()+10)

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Booking.bulkCreate([
      {
        userId: 1,
        spotId: 8,
        startDate: new Date(),
        endDate: tenDaysFromNow
      },
      {
        userId: 2,
        spotId: 1,
        startDate: new Date(),
        endDate: tenDaysFromNow
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      userId: { [Op.in]: [1,2] },
      spotId: { [Op.in]: [8,1] }
    }, {});
  }
};
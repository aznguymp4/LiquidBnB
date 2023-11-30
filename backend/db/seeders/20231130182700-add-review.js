'use strict';
const { Review } = require('../models');
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Review.bulkCreate([
      {
        spotId: 1,
        userId: 1,
        review: 'Awesome',
        stars: 5
      },
      {
        spotId: 2,
        userId: 1,
        review: 'Meh...',
        stars: 2
      },
      {
        spotId: 1,
        userId: 2,
        review: 'Refund pls',
        stars: 1
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      review: { [Op.in]: ['Awesome','Meh...','Refund pls'] }
    }, {});
  }
};

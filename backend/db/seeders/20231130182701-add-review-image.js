'use strict';

/** @type {import('sequelize-cli').Migration} */
const { ReviewImage } = require('../models');
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await ReviewImage.bulkCreate([
      {
        reviewId: 1,
        url: 'https://example.com/1'
      },
      {
        reviewId: 2,
        url: 'https://example.com/2'
      },
      {
        reviewId: 3,
        url: 'https://example.com/3'
      },
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'ReviewImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      url: { [Op.like]: 'https://example.com/%' }
    }, {});
  }
};

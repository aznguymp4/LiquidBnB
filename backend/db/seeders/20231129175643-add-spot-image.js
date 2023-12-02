'use strict';

/** @type {import('sequelize-cli').Migration} */
const { SpotImage } = require('../models');
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await SpotImage.bulkCreate([
      {
        spotId: 1,
        url: 'https://github.com/appacademy/practice-for-week-07-aa-times-long-practice/blob/main/images/AA_Times_Logo.png?raw=true',
        preview: true
      },
      {
        spotId: 1,
        url: 'https://github.com/appacademy/practice-for-week-07-aa-times-long-practice/blob/main/images/AA_Times_Logo.png',
        preview: false
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      url: { [Op.in]: ['https://github.com/appacademy/practice-for-week-07-aa-times-long-practice/blob/main/images/AA_Times_Logo.png?raw=true','https://github.com/appacademy/practice-for-week-07-aa-times-long-practice/blob/main/images/AA_Times_Logo.png'] }
    }, {});
  }
};

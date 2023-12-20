'use strict';

/** @type {import('sequelize-cli').Migration} */
const { SpotImage } = require('../models');
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const exampleUrls = [
  'https://media.discordapp.net/attachments/860985407452479508/1186567010910486578/chrome_20231219_2044.png?format=webp&quality=lossless&width=1261&height=683',
  'https://cdn.discordapp.com/attachments/860985407452479508/1186567010910486578/chrome_20231219_2044.png',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/The_Krusty_Krab.png/1200px-The_Krusty_Krab.png',
  'https://i.ytimg.com/vi/PfeQUEges2g/maxresdefault.jpg'
]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await SpotImage.bulkCreate([
      {
        spotId: 1,
        url: exampleUrls[0],
        preview: true
      },
      {
        spotId: 1,
        url: exampleUrls[1],
        preview: false
      },
      {
        spotId: 2,
        url: exampleUrls[2],
        preview: true
      },
      {
        spotId: 3,
        url: exampleUrls[3],
        preview: true
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      url: { [Op.in]: exampleUrls }
    }, {});
  }
};

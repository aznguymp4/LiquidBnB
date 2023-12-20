'use strict';

/** @type {import('sequelize-cli').Migration} */
const { Spot } = require('../models');
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Spot.bulkCreate([
      {
        ownerId: 1,
        address: "123 Disney Lane",
        city: "San Francisco",
        state: "California",
        country: "United States of America",
        lat: 37.7645358,
        lng: -122.4730327,
        name: "App Academy",
        description: "Place where web developers are created",
        price: 123
      },
      {
        ownerId: 2,
        address: "321 Something Street",
        city: "Bikini Bottom",
        state: "Oceania",
        country: "United Seas of Atlanta",
        lat: 63.2874012,
        lng: 30.9834976,
        name: "Krusty Krab",
        description: "The best pizzas in Ocean!",
        price: 321
      },
      {
        ownerId: 2,
        address: "456 EnderPearl Drive",
        city: "Stronghold",
        state: "PlanetMinecraft",
        country: "United Blocks of America",
        lat: -37.6502374,
        lng: 87.5236978,
        name: "Amazing House",
        description: "Comfy!",
        price: 64
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: { [Op.in]: ['App Academy'] }
    }, {});
  }
};

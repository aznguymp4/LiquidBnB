'use strict';

/** @type {import('sequelize-cli').Migration} */
const { User } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const users = [
  {
    email: 'demo@user.io',
    username: 'Demo-lition',
    firstName: 'Demo',
    lastName: 'Lition',
    hashedPassword: bcrypt.hashSync('password')
  },
  {
    email: 'user1@user.io',
    username: 'FakeUser1',
    firstName: 'Fake',
    lastName: 'User',
    hashedPassword: bcrypt.hashSync('password2')
  },
  {
    email: 'johndoe@user.io',
    username: 'JohnDoe',
    firstName: 'John',
    lastName: 'Doe',
    hashedPassword: bcrypt.hashSync('password3')
  },
  {
    email: 'janedoe@user.io',
    username: 'JaneDoe',
    firstName: 'Jane',
    lastName: 'Doe',
    hashedPassword: bcrypt.hashSync('password4')
  },
  {
    email: 'timcook@apple.com',
    username: 'TimCook',
    firstName: 'Tim',
    lastName: 'Cook',
    hashedPassword: bcrypt.hashSync('AndroidSucks')
  },
  {
    email: 'reviewer1@user.io',
    username: 'positiveReviewer5001',
    firstName: 'John',
    lastName: 'Smith',
    hashedPassword: bcrypt.hashSync('iReviewStuff1')
  },
  {
    email: 'reviewer2@user.io',
    username: 'positiveReviewer5002',
    firstName: 'Jane',
    lastName: 'Smith',
    hashedPassword: bcrypt.hashSync('iReviewStuff2')
  },
  {
    email: 'reviewer3@user.io',
    username: 'negativeReviewer5001',
    firstName: 'Robert',
    lastName: 'Appleseed',
    hashedPassword: bcrypt.hashSync('iReviewStuff3')
  },
  {
    email: 'reviewer4@user.io',
    username: 'negativeReviewer5002',
    firstName: 'Rihanna',
    lastName: 'Appleseed',
    hashedPassword: bcrypt.hashSync('iReviewStuff4')
  },
  {
    email: 'reviewer5@user.io',
    username: 'neutralReviewer5001',
    firstName: 'Pikachu',
    lastName: 'Ketchup',
    hashedPassword: bcrypt.hashSync('iReviewStuff5')
  },
  {
    email: 'reviewer6@user.io',
    username: 'neutralReviewer5002',
    firstName: 'Adam',
    lastName: 'Baker',
    hashedPassword: bcrypt.hashSync('iReviewStuff6')
  }
]

module.exports = {
  async up (queryInterface, Sequelize) {
    await User.bulkCreate(users, { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: users.map(u=>u.username) }
    }, {});
  }
};
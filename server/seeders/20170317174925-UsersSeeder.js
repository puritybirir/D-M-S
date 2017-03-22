const faker = require('faker');
const bcrypt = require('bcrypt-nodejs');
const salt = bcrypt.genSaltSync(10);

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [
      {
        firstName: 'Kevin',
        lastName: 'Olusola',
        userName: 'kolusola',
        email: 'kolusola@example.com',
        password: bcrypt.hashSync('123456', salt),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        userName: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        userName: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        userName: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        userName: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        userName: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        createdAt: new Date(),
        updatedAt: new Date()
      }

    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};

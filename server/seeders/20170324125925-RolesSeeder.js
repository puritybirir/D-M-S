const faker = require('faker');

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Roles', [
    {
      name: 'user',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'trialUser',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'coolUser',
      createdAt: new Date(),
      updatedAt: new Date()
    },

  ], {}),
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Roles', null, {});
  }
};



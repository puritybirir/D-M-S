const faker = require('faker');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('documents', [
      {
        title: faker.lorem.text(),
        content: faker.lorem.paragraphs(),
        userId: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: faker.lorem.text(),
        content: faker.lorem.paragraphs(),
        userId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: faker.lorem.text(),
        content: faker.lorem.paragraphs(),
        userId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: faker.lorem.text(),
        content: faker.lorem.paragraphs(),
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: faker.lorem.text(),
        content: faker.lorem.paragraphs(),
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('documents', null, {});
  }
};

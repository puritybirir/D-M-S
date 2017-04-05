const faker = require('faker');

const fakeDocument = (overrides = {}) => {
  const doc = {
    title: faker.lorem.text(),
    content: faker.lorem.paragraphs(),
    userId: 5,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  return Object.assign(doc, overrides);
};

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
      'documents', []
      .concat(Array.from({ length: 4 },
      () => fakeDocument({ userId: '1' }))),
       {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('documents', null, {})
};

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

const documentsHelper = Array.from({ length: 4 }, () => fakeDocument({ userId: '1' }));

exports.documentsHelper = documentsHelper;


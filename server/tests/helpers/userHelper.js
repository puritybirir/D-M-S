const faker = require('faker');

const usersHelper = [
  {
    firstName: 'Kevin',
    lastName: 'Olusola',
    userName: 'kolusola',
    email: 'kolusola@example.com',
    password: '123456',
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
];

exports.usersHelper = usersHelper;

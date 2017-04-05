const faker = require('faker');

const usersHelper = [
  {
    firstName: 'Kevin',
    lastName: 'Olusola',
    userName: 'kolusola',
    email: 'kolusola@example.com',
    password: '123456',
    roleId: '1',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    firstName: 'Reedako',
    lastName: 'Banks',
    userName: 'RBanks',
    email: 'reedakobanks@example.com',
    password: 'stranger',
    roleId: '2',
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

const generateUsers = num => Array.from({ length: num }, () => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  userName: faker.internet.userName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  roleId: '1',
  createdAt: new Date(),
  updatedAt: new Date()
}));


exports.usersHelper = usersHelper.concat(generateUsers(4));

const faker = require('faker');
const bcrypt = require('bcrypt-nodejs');

const salt = bcrypt.genSaltSync(10);

const testUser1 = {
  firstName: 'Kevin',
  lastName: 'Olusola',
  userName: 'kolusola',
  email: 'kolusola@example.com',
  password: bcrypt.hashSync('123456', salt),
  roleId: '1'
};

const testUser2 = {
  firstName: 'Reedako',
  lastName: 'Banks',
  userName: 'RBanks',
  email: 'reedakobanks@example.com',
  password: bcrypt.hashSync('stranger', salt),
  roleId: '2'
};

const fakeUser = (overrides = {}) => {
  const user = {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    userName: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    roleId: '1',
    createdAt: new Date(),
    updatedAt: new Date()
  };

  return Object.assign(user, overrides);
};

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
      'users',
      [fakeUser(testUser1), fakeUser(testUser2)]
      .concat(Array.from({ length: 4 },
      () => fakeUser({ roleId: '1' }))),
       {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('users', null, {})
};

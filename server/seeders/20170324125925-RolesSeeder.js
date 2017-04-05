const fakeRole = (overrides = {}) => {
  const role = {
    name: 'user',
    createdAt: new Date(),
    updatedAt: new Date()
  };

  return Object.assign(role, overrides);
};
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'Roles', [].concat(Array.from({ length: 4 },
     () => fakeRole())), {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Roles', null, {})
};


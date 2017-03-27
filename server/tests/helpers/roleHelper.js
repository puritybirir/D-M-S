const faker = require('faker');

const roleHelper = [
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
];

exports.roleHelper = roleHelper;

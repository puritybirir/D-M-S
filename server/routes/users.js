const express = require('express');

const router = express.Router();
const usersController = require('../controllers').users;

const users = new usersController();
const authenticate = require('../helpers/middlewares').authenticate;

router.post('/users', users.create);
router.post('/users/login', users.login);

// middleware authenticated
router.use(authenticate);

router.get('/users', users.listAll);
router.get('/users/:id', users.findOne);
router.put('/users/:id', users.update);
router.get('/search/users', users.search);
router.post('/users/logout', users.logout);
router.delete('/users/:id', users.isAdmin, users.delete);

module.exports = router;

const express = require('express');

const router = express.Router();
const usersController = require('../controllers').users;

const users = new usersController();
const authenticate = require('../helpers/middlewares').authenticate;

router.post('/users', users.create);
router.post('/users/login', users.login);

// middleware authenitcated
router.use(authenticate);

router.get('/users', users.listAll);
router.get('/users/:id', users.findOne);
router.put('/users/:id', users.update);
router.delete('/users/:id', users.delete);

module.exports = router;

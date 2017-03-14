const express = require('express');

const router = express.Router();
const usersController = require('../controllers').users;
const authenticate = require('../helpers/middlewares').authenticate;

router.post('/', usersController.create);
router.post('/login', usersController.login);

// middleware authenitcated
router.use(authenticate);

router.get('/users', usersController.listAll);
router.get('/users/:userId', usersController.findOne);
router.put('/users/:userId', usersController.update);
router.delete('/users/:userId', usersController.delete);

module.exports = router;


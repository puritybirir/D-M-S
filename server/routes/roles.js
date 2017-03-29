const express = require('express');
const authenticate = require('../helpers/middlewares').authenticate;

const router = express.Router();
const rolesController = require('../controllers').roles;

const roles = new rolesController();
router.use(authenticate);

router.post('/roles', roles.create);
router.get('/roles/:id', roles.findOne);
router.put('/roles/:id', roles.update);
router.get('/roles', roles.listAll);
router.delete('/roles/:id', roles.delete);

module.exports = router;

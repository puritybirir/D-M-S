const express = require('express');
const middlewares = require('../helpers/middlewares');

const router = express.Router();
const rolesController = require('../controllers').roles;

const roles = new rolesController();
router.use(middlewares.authenticate);
router.use(middlewares.confirmAdmin);

router.post('/roles', roles.create);
router.get('/roles/:id', roles.findOne);
router.put('/roles/:id', roles.update);
router.get('/roles', roles.listAll);
router.delete('/roles/:id', roles.delete);

module.exports = router;

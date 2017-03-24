const express = require('express');

const router = express.Router();
const rolesController = require('../controllers').roles;

const roles = new rolesController();

router.post('/roles', roles.create);
router.post('/roles/:id', roles.findOne);
router.get('/roles/:id', roles.update);
router.get('/roles', roles.listAll);
router.delete('/roles/:id', roles.delete);

module.exports = router;

const express = require('express');
const authenticate = require('../helpers/middlewares').authenticate;

const router = express.Router();
const documentsController = require('../controllers').documents;

// middleware authenitcated
router.use(authenticate);

router.post('/', documentsController.create);
router.get('/', documentsController.listAll);
router.get('/:id', documentsController.findOne);
router.put('/:id', documentsController.update);
router.delete('/:id', documentsController.delete);

module.exports = router;

const express = require('express');

const router = express.Router();
const documentsController = require('../controllers').documents;

router.post('/', documentsController.create);
router.get('/', documentsController.listAll);
router.get('/:id', documentsController.findOne);
router.put('/:id', documentsController.update);

module.exports = router;

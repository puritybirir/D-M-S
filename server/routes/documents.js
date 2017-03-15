const express = require('express');
const authenticate = require('../helpers/middlewares').authenticate;

const router = express.Router();
const documentsController = require('../controllers').documents;

const doc = new documentsController();
// middleware authenitcated
router.use(authenticate);

router.post('/', doc.create);
router.get('/', doc.listAll);
router.get('/:id', doc.findOne);
router.put('/:id', doc.update);
router.delete('/:id', doc.delete);

module.exports = router;

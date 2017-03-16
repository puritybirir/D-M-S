const express = require('express');
const authenticate = require('../helpers/middlewares').authenticate;

const router = express.Router();
const documentsController = require('../controllers').documents;

const doc = new documentsController();
// middleware authenitcated
router.use(authenticate);

router.post('/documents', doc.create);
router.get('/documents', doc.listAll);
router.get('/documents/:id', doc.findOne);
router.put('/documents/:id', doc.update);
router.delete('/documents/:id', doc.delete);
router.get('/search/documents', doc.search);

module.exports = router;

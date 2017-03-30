const express = require('express');
const middlewares = require('../helpers/middlewares');

const router = express.Router();
const documentsController = require('../controllers').documents;

const doc = new documentsController();
router.use(middlewares.authenticate);

router.post('/documents', doc.create);
router.get('/documents', middlewares.docUserAccess, doc.listAll);
router.get('/documents/:id', doc.findOne);
router.get('/search/documents', doc.search);

router.use(middlewares.confirmAdmin);
router.delete('/documents/:id', doc.delete);
router.put('/documents/:id', doc.update);

module.exports = router;

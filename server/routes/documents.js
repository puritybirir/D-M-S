const express = require('express');
const authenticate = require('../helpers/middlewares').authenticate;
const confirmAdmin = require('../helpers/middlewares').confirmAdmin;

const router = express.Router();
const documentsController = require('../controllers').documents;

const doc = new documentsController();
// middleware authenitcated
router.use(authenticate);

router.post('/documents', doc.create);
router.get('/documents', doc.listAll);
router.get('/documents/:id', doc.findOne);
router.get('/search/documents', doc.search);

router.use(confirmAdmin);
router.delete('/documents/:id', doc.delete);
router.put('/documents/:id', doc.update);

module.exports = router;

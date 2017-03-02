const documentsController = require('../controllers').documents;
const rolesController = require('../controllers').roles;

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the documents API!',
  }));
  app.post('/api/documents', documentsController.create);
  app.post('/api/role', rolesController.create);
  app.get('/api/documents', documentsController.list);
  app.post('/api/documents', rolesController.create);
};


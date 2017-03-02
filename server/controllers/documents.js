const documents = require('../models').document;

module.exports = {
  create(req, res) {
    return documents
      .create({
        title: req.body.title,
        content: req.body.content,
      })
      .then(document => res.status(201).send(document))
      .catch(error => res.status(400).send(error));
  },
  list(req, res) {
    return documents
    .all()
    .then(document => res.status(200).send(document))
    .catch(error => res.status(400).send(error));
  },
};




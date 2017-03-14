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
  listAll(req, res) {
    return documents
    .all()
    .then(document => res.status(200).send(document))
    .catch(error => res.status(400).send(error));
  },

  findOne(req, res) {
    return documents
    .findById(req.params.id)
    .then((document) => {
      if (!document) {
        return res.status(404).send({
          message: 'Document Not Found',
        });
      }
      return res.status(200).send(document);
    })
    .catch(error => res.status(400).send(error));
  },

  update(req, res) {
    return documents
    .findById(req.params.id)
    .then((document) => {
      if (!document) {
        return res.status(404).send({
          message: 'Document Not Found',
        });
      }
      // Filter
      const updatedDocument = {
        title: req.body.title,
        content: req.body.content,
      };

      return document
        .update(updatedDocument, { fields: Object.keys(updatedDocument) })
        .then(doc => res.status(200).send(doc))
        .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(400).send(error));
  },

  delete(req, res) {
    return documents
    .find({
      where: {
        id: req.params.id,
      },
    })
    .then((document) => {
      if (!document) {
        return res.status(404).send({
          message: 'Documetn Not Found',
        });
      }
      return document
        .destroy()
        .then(() => res.status(204).send())
        .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(400).send(error));
  },
};


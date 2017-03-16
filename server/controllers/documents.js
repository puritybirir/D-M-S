const documents = require('../models').document;

/** Class representing a Document. */
class Document {
  /**
 * Creates new user
 * @param {object} req
 * @param {object} res
 */
  create(req, res) {
    return documents
      // .create(req.body)
      .create({
        title: req.body.title,
        content: req.body.content,
        access: req.body.access || 'private',
        userId: req.tokenDecode.userId
      })
      .then(document => res.status(201).send(document))
      .catch(error => res.status(400).send(error));
  }
  listAll(req, res) {
    if (req.query.limit || req.query.offset)
      return documents
    .findAll({
      limit: req.query.limit,
      offset: req.query.offset
    })
  .then(user => res.status(200).send(user))
  .catch(error => res.status(400).send(error));
    return documents
    .all()
    .then(document => res.status(200).send(document))
    .catch(error => res.status(400).send(error));
  }

  findOne(req, res) {
    return documents
    .findById(req.params.id)
    .then((document) => {
      if (!document)
        return res.status(404).send({
          message: 'Document Not Found',
        });

      return res.status(200).send(document);
    })
    .catch(error => res.status(400).send(error));
  }

  update(req, res) {
    return documents
    .findById(req.params.id)
    .then((document) => {
      if (!document)
        return res.status(404).send({
          message: 'Document Not Found',
        });

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
  }

  delete(req, res) {
    return documents
    .find({
      where: {
        id: req.params.id,
      },
    })
    .then((document) => {
      if (!document)
        return res.status(404).send({
          message: 'Document Not Found',
        });

      return document
        .destroy()
        .then(() => {
          res.status(200).send({
            message: 'Document deleted successfully',
          });
        })
        .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(400).send(error));
  }

  search(req, res) {
    return documents
    .findAll({
      where: {
        $or: [
          {
            title: { $iLike: `%${req.query.doctitle}%` }
          }
        ]
      },
      order: '"createdAt" ASC'
    })
    .then((doc) => {
      if (doc.length < 1)
        return res.status(400).send({
          message: 'No users match the search criteria'
        });
      return res.status(200).send(doc);
    })
    .catch(error => res.status(400).send(error));
  }

}

exports.Document = Document;

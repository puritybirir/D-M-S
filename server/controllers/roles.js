const roles = require('../models').Role;

module.exports = {
  create(req, res) {
    return roles
      .create({
        name: req.body.name,
      })
      .then(role => res.status(201).send(role))
      .catch(error => res.status(400).send(error));
  },
};

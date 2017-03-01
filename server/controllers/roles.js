const roles = require('../models').Role;

module.exports = {
  create(req, res) {
    return roles
      .create({
        Title: req.body.title,
        rolesId: req.params.todoId,

      })
      .then(role => res.status(201).send(role))
      .catch(error => res.status(400).send(error));
  },
};

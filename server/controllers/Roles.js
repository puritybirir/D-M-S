const roles = require('../models').Role;

class Roles {
  create(req, res) {
    return roles
    .create(req.body)
    .then((role) => {
      res.status(201).send({
        message: 'Role created succesfully',
        role,
      });
    })
    .catch(error => res.status(400).send(error.errors));
  }
  update(req, res) {
    return roles
    .findById(req.params.id)
    .then((role) => {
      if (!role) {
        return res.status(404).send({
          message: 'Role Not Found',
        });
      }
      return role
        .update(req.body)
        .then(() => res.status(200).send(role))
        .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(400).send(error));
  }
  findOne(req, res) {
    return roles
    .findById(req.params.id)
    .then((role) => {
      if (!role) {
        return res.status(404).send({
          message: 'Role Not Found',
        });
      }
      return res.status(200).send(role);
    })
    .catch(error => res.status(400).send(error));
  }
  listAll(req, res) {
    return roles
    .findAll()
    .then(role => res.status(200).send({ message: 'Listing all available roles', role }))
    .catch(error => res.status(400).send(error));
  }
  delete(req, res) {
    return roles
    .findById(req.params.id)
    .then((role) => {
      if (!role) {
        return res.status(404).send({
          message: 'Role not found',
        });
      }
      return role
        .destroy()
        .then(() => {
          res.status(200).send({
            message: 'Role deleted successfully',
          });
        })
        .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(400).send(error));
  }
}

exports.Roles = Roles;

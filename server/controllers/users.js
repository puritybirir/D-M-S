require('dotenv').config();
const User = require('../models').user;
const document = require('../models').document;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class Users {
  create(req, res) {
    return User
    .create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password
    })
    .then((user) => {
      res.status(201).send({
        message: 'User created succesfully',
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        roleId: user.roleId,
      });
    })
    .catch(error => res.status(400).send(error));
  }

  login(req, res) {
    if (req.body.email && req.body.password)
      User.findOne({
        where: {
          email: req.body.email,
        }
      }).then((user) => {
        if (!user)
          return res.send({
            message: 'Unknown user',
          });

        return bcrypt.compare(req.body.password, user.password, (err, result) => {
          if (err)
            res.status(401).send({ error: err });

          if (result) {
            const payload = {
              email: user.email,
              userId: user.id,
              roleId: user.roleId
            }
            const token = jwt.sign(payload, process.env.SECRET, { expiresIn: 60 * 60 });
            res.send({ email: user.email, Token: token });
          } else
            res.status(401).send({
              message: 'Email/Password mismatch',
            });
        });
      })
      .catch(err => res.send(err));
    else
      res.status(400).send({
        message: 'No email or password provided',
      });
  }

listAll(req, res) {
  return User
    .findAll()
    .then(users => res.status(200).send(users))
    .catch(error => res.status(400).send(error));
}

findOne(req, res) {
  return User
    .findById(req.params.id, {
      include: [{
        model: document,
        as: 'document',
      }],
    })
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: 'User Not Found',
        });
      }
      return res.status(200).send(user);
    })
    .catch(error => res.status(400).send(error));
  }

  update(req, res) {
    return User
    .findById(req.params.id)
    .then((user) => {
      if (!user)
        return res.status(404).send({
          message: 'User Not Found',
        });

      return user
        .update(req.body)
        .then(() => res.status(200).send(user))
        .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(400).send(error));
  }

  delete(req, res) {
    return User
    .findById(req.params.id)
    .then((user) => {
      if (!user)
        return res.status(400).send({
          message: 'Todo Not Found',
        });

      return user
        .destroy()
        .then(() => res.status(200).send({ message: 'User deleted successfully.' }))
        .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(400).send(error));
  }
}

exports.Users = Users;

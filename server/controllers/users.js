require('dotenv').config();
const User = require('../models').user;
const document = require('../models').document;
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');

class Users {
  create(req, res) {
    return User
    .create(req.body)
    .then((user) => {
      res.status(201).send({
        message: 'User created succesfully',
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        roleId: user.roleId,
        userName: req.body.userName
      });
    })
    .catch(error => res.status(400).send(error.errors));
  }

  login(req, res) {
    if (req.body.email && req.body.password) {
      User.findOne({
        where: {
          email: req.body.email,
        }
      }).then((user) => {
        if (!user) {
          return res.send({
            message: 'Unknown user',
          });
        }

        return bcrypt.compare(req.body.password, user.password, (err, result) => {
          if (err) { res.status(401).send({ error: err }); }

          if (result) {
            const payload = {
              email: user.email,
              userId: user.id,
              roleId: user.roleId
            };
            const token = jwt.sign(payload, process.env.SECRET, { expiresIn: 60 * 60 });
            res.send({ message: 'You have been logged in succesfully', email: user.email, Token: token });
          } else {
            res.status(401).send({
              message: 'Email/Password mismatch',
            });
          }
        });
      })
      .catch(err => res.send(err));
    } else {
      res.status(400).send({
        message: 'No email or password provided',
      });
    }
  }

  listAll(req, res) {
    if (req.query.limit || req.query.offset) {
      return User
    .findAll({
      limit: req.query.limit,
      offset: req.query.offset
    })
  .then(user => res.status(200).send({ message: 'Here are the users that match the set criteria', user }))
  .catch(error => res.status(400).send(error));
    }
    return User
    .findAll()
    .then(users => res.status(200).send({ message: 'Listing all available users', users }))
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
      if (!user) {
        return res.status(404).send({
          message: 'User Not Found',
        });
      }

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
      if (!user) {
        return res.status(400).send({
          message: 'User does not exist',
        });
      }

      return user
        .destroy()
        .then(() => res.status(200).send({ message: 'User deleted successfully.' }))
        .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(400).send(error));
  }

  search(req, res) {
    return User
    .findAll({
      where: {
        $or: [
          {
            userName: { $iLike: `%${req.query.q}%` }
          }
        ]
      },
      order: '"createdAt" ASC'
    })

    .then((user) => {
      if (user.length < 1) {
        return res.status(400).send({
          message: 'No users match the search criteria'
        });
      }
      return res.status(200).send({ message: 'Listing all the users that match the search criteria', user });
    })
    .catch(error => res.status(400).send(error));
  }

  logout(req, res) {
    res.status(200).send({
      message: 'You were logged out successfully'
    });
  }

  isAdmin(req, res, next) {
    if (!req.tokenDecoded) {
      return res.status(400).send({
        message: 'You are not logged in'
      });
    }
    if (req.tokenDecoded.roleId !== '2') {
      return res.status(400).send({
        message: 'You are not an admin'
      });
    }
    return next();
  }
}
exports.Users = Users;

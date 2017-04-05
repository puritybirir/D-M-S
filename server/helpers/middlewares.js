const jwt = require('jsonwebtoken');
const documents = require('../models').document;

const authenticate = (req, res, next) => {
  const token = req.query.token || req.headers['x-access-token'];
  if (!token) {
    return res.status(401).send({
      success: false,
      message: 'No token provided',
    });
  }
  return jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token provided',
      });
    }
    req.tokenDecoded = decoded;

    return next();
  });
};

const confirmAdmin = (req, res, next) => {
  if (!req.tokenDecoded) {
    return res.status(400).send({
      message: 'You are not logged in'
    });
  }
  if (req.tokenDecoded.roleId !== '2') {
    return res.status(403).send({
      message: 'You are not an admin'
    });
  }
  return next();
};

const docUserAccess = (req, res, next) => {
  if (req.tokenDecoded.roleId === '1') {
    return documents
    .find({
      where: {
        userId: req.tokenDecoded.userId
      },
    })
    .then((docs) => {
      req.data = docs;
      next();
    })
    .catch((error) => {
      res.status(400).send(error);
    });
  }
  next();
};

const docAdminAccess = (req, res, next) => {
  if (req.tokenDecoded.roleId === '2') {
    return documents
    .find({
      where: {
        access: 'private' && 'public'
      },
    })
    .then((docs) => {
      req.data = docs;
      next();
    })
    .catch((error) => {
      res.status(400).send(error);
    });
  }
  next();
};



module.exports = { authenticate, confirmAdmin, docAdminAccess, docUserAccess };


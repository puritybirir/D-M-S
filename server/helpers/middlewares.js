const jwt = require('jsonwebtoken');

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

module.exports = { authenticate, confirmAdmin };

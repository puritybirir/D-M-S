const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  const token = req.query.token || req.headers['x-access-token'];
  if (!token) {
    return res.status(401).send({
      success: false,
      message: 'No token provided',
    });
  }

  return jwt.verify(token, process.env.SECRET, (err) => {
    if (err) {
      return res.status(401).json({
        success: false,
        messsage: 'Invalid token provided',
      });
    }
    return next();
  });
};

module.exports = { authenticate };

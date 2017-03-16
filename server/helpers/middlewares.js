const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  const token = req.query.token || req.headers['x-access-token'];
  if (!token)
    return res.status(401).send({
      success: false,
      message: 'No token provided',
    });

  return jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        success: false,
        messsage: 'Invalid token provided',
      });
    } else {
      req.tokenDecode = decoded;
    }
    return next();
  });
};

module.exports = { authenticate };

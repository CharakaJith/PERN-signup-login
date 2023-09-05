const jwt = require('jsonwebtoken');
const BlacklistedJwtRepository = require('../repositories/blacklisted.jwt.repository');

const Authenticate = {
  authenticate: async (req, res, next) => {
    try {
      const token = req.headers.authorization;

      // validate current jwt
      const jwtToken = await BlacklistedJwtRepository.getJwt(token);
      if (jwtToken) {
        throw new Error();
      }

      const decode = jwt.verify(JSON.parse(token), process.env.JWT_SECRET);
      req.user = decode.tokenUser;

      next();
    } catch (error) {
      res.status(401).json({
        success: false,
        message: 'Authentication failed!',
      });
    }
  },
};

module.exports = Authenticate;

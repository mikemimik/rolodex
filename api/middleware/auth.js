'use strict';

const tokenService = require('../utils/tokenService');
const { HTTP401Error } = require('../utils/httpErrors');

module.exports = async (req, res, next) => {
  const authHeader = req.get('Authorization');

  if (!authHeader) {
    next(new HTTP401Error());
  } else {
    try {
      /* eslint-disable-next-line */
      const [prefix, token] = authHeader.split(' ');
      const decoded = await tokenService.verifyToken(token);

      if (decoded) {
        req.token = decoded;
        next();
      } else {
        next(new HTTP401Error());
      }
    } catch (e) {
      next(e);
    }
  }
};

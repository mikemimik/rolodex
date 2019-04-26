'use strict';

const { HTTPClientError, HTTP404Error } = require('./httpErrors');
const { logRequest } = require('../utils');

exports.notFoundError = () => {
  throw new HTTP404Error('Method not found.');
};

exports.clientError = (err, req, res, next) => {
  if (err instanceof HTTPClientError) {
    res.status(err.statusCode).json({ error: err.message });
    logRequest(req, res);
  } else {
    next(err);
  }
};

exports.serverError = (err, req, res, next) => {
  console.error(err);
  if (process.env.NODE_ENV === 'production') {
    res.status(500).json({ error: 'Internal Server Error' });
  } else {
    res.status(500).send(err.stack);
  }
  logRequest(req, res);
};

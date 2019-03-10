'use strict';

const { HTTPClientError, HTTP404Error } = require('./httpErrors');

exports.notFoundError = () => {
  throw new HTTP404Error('Method not found.');
};

exports.clientError = (err, res, next) => {
  if (err instanceof HTTPClientError) {
    console.warn(err);
    res.status(err.statusCode).send(err.message);
  } else {
    next(err);
  }
};

exports.serverError = (err, res, next) => {
  console.error(err);
  if (process.env.NODE_ENV === 'production') {
    res.status(500).send('Internal Server Error');
  } else {
    res.status(500).send(err.stack);
  }
};

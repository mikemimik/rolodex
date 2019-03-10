'use strict';

const ErrorHandler = require('../utils/errorHandler');

const handle404Error = exports.handle404Error = (router) => {
  router.use((req, res) => {
    ErrorHandler.notFoundError();
  });
};

const handleClientError = exports.handleClientError = (router) => {
  router.use((err, req, res, next) => {
    ErrorHandler.clientError(err, res, next);
  });
};

const handleServerError = exports.handleServerError = (router) => {
  router.use((err, req, res, next) => {
    ErrorHandler.serverError(err, res, next);
  });
};

module.exports = [handle404Error, handleClientError, handleServerError];

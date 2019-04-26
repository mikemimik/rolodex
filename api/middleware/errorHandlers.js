'use strict';

const ErrorHandler = require('../utils/errorHandler');

const handle404Error = exports.handle404Error = (router) => {
  router.use((req, res, next) => {
    ErrorHandler.notFoundError();
  });
};

const handleClientError = exports.handleClientError = (router) => {
  router.use(ErrorHandler.clientError);
};

const handleServerError = exports.handleServerError = (router) => {
  router.use(ErrorHandler.serverError);
};

module.exports = [handle404Error, handleClientError, handleServerError];

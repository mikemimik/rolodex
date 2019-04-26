'use strict';

const path = require('path');

const { publicPath } = require('./public');
const ErrorHandler = require('../utils/errorHandler');

const redirect = exports.redirect = (router) => {
  router.use('/*', (req, res, next) => {
    res.sendFile(path.join(publicPath, 'index.html'));
  });
};

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

module.exports = [redirect, handle404Error, handleClientError, handleServerError];

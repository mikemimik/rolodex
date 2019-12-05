'use strict';

const path = require('path');

const { publicPath } = require('./public');
const ErrorHandler = require('../utils/errorHandler');

const redirect = exports.redirect = (app) => {
  app.use('/*', (req, res, next) => {
    res.sendFile(path.join(publicPath, 'index.html'));
  });
};

const handleAPI404Error = exports.handle404Error = (app) => {
  app.use('/api/*', (req, res, next) => {
    ErrorHandler.notFoundError();
  });
};

const handleClientError = exports.handleClientError = (app) => {
  app.use(ErrorHandler.clientError);
};

const handleServerError = exports.handleServerError = (app) => {
  app.use(ErrorHandler.serverError);
};

module.exports = [handleAPI404Error, redirect, handleClientError, handleServerError];

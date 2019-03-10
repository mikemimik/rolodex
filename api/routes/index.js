'use strict';

const bookRoutes = require('./books/bookController');

module.exports = [
  ...bookRoutes,
];

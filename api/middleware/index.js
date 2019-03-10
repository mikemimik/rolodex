'use strict';

const { handleBodyRequestParsing } = require('./common');
const { handleServingPublicFolder } = require('./public');

module.exports = [
  handleBodyRequestParsing,
  handleServingPublicFolder,
];

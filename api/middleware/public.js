'use strict'

const express = require('express')
const path = require('path')

const { PUBLIC_FOLDER } = require('../utils/constants')

const publicOptions = {
  dotfiles: 'ignore' // default
  // etag: true, // default
  // extensions: [],
  // fallthrough: true, // default
  // immutable: false, // default
  // index: false, // default: index.html
  // lastModified: true, // default
  // maxAge: 0, // default
  // redirect: false, // default: true
  // setHeaders: function (res, path, stat) {
  //   res.set('x-timestamp', Date.now());
  // },
}
const publicPath = exports.publicPath = path.resolve(__dirname, '../..', PUBLIC_FOLDER)

exports.handleServingPublicFolder = (app) => {
  app.use('/', express.static(publicPath, publicOptions))
}

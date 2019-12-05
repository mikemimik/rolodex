'use strict'

const express = require('express')

exports.handleBodyRequestParsing = (router) => {
  router.use(express.urlencoded({ extended: true }))
  router.use(express.json())
}

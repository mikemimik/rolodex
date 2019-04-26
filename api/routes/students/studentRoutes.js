'use strict';

const express = require('express');
const router = express.Router();

const { logRequest } = require('../../utils');

const studentService = require('./studentService');

// GET /student/
router.route('/')
  .get(async (req, res, next) => {
    try {

    } catch (e) {
      next(e);
    }
  })
// POST /student/ (creating a new student)
  .post(async (req, res, next) => {
    try {

    } catch (e) {
      next(e);
    }
  });

// GET /student/:studentId
router.route('/:studentId')
  .get(async (req, res, next) => {
    try {

    } catch (e) {
      next(e);
    }
  })
// PUT /student/:studentId (updating student)
  .put(async (req, res, next) => {
    try {

    } catch (e) {
      next(e);
    }
  });

exports.router = router;

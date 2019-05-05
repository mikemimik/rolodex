'use strict';

const express = require('express');
const router = express.Router();

const requiresAuth = require('../../middleware/auth');
const { logRequest } = require('../../utils');

const studentService = require('./studentService');

// GET /student/
router.route('/')
  .get(
    requiresAuth,
    async (req, res, next) => {
      try {
        const students = await studentService.listStudents();
        res.json({ data: students });
        logRequest(req, res);
      } catch (e) {
        next(e);
      }
    }
  )
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

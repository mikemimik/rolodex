'use strict';

const express = require('express');
const router = express.Router();

const cohortService = require('./cohortService');

// GET /cohorts/
router.route('/')
  .get(async (req, res, next) => {
    try {
      const cohorts = await cohortService.listCohorts();
      res.json({
        data: cohorts,
      });
    } catch (e) {
      next(e);
    }
  })
// POST /cohorts/ (create new cohort)
  .post(async (req, res, next) => {
    const { body } = req;
    try {
      const cohort = await cohortService.createCohort(body);
      res.status(201).json({
        data: [cohort],
      });
    } catch (e) {
      next(e);
    }
  });

exports.router = router;

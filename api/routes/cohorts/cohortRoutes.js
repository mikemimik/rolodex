'use strict';

const express = require('express');
const router = express.Router();

const requiresAuth = require('../../middleware/auth');
const { logRequest } = require('../../utils');

const cohortService = require('./cohortService');

// GET /cohorts/
router.route('/')
  .get(
    requiresAuth,
    async (req, res, next) => {
      try {
        const cohorts = await cohortService.listCohorts();
        res.json({ data: cohorts });
        logRequest(req, res);
      } catch (e) {
        next(e);
      }
    }
  )
// POST /cohorts/ (create new cohort)
  .post(
    requiresAuth,
    async (req, res, next) => {
      const { body } = req;
      try {
        const cohort = await cohortService.createCohort(body);
        res.status(201).json({ data: [cohort] });
        logRequest(req, res);
      } catch (e) {
        next(e);
      }
    }
  );

exports.router = router;

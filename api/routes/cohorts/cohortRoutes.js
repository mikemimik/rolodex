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

// PUT /cohorts/:cohortId
router.route('/:cohortId')
  .put(
    requiresAuth,
    async (req, res, next) => {
      try {
        const { cohortId } = req.params;
        const { body } = req;
        const cohort = await cohortService.updateCohort(cohortId, body);
        res.status(200).json({ data: [cohort] });
        logRequest(req, res);
      } catch (e) {
        next(e);
      }
    }
  );

// GET /cohorts/:cohortId/students
router.route('/:cohortId/students')
  .get(
    requiresAuth,
    async (req, res, next) => {
      console.group('CohortRoutes::GET /:cohortId/students');
      try {
        const { cohortId } = req.params;
        const cohorts = await cohortService.listCohorts({
          filter: { _id: cohortId },
          include: ['students'],
        });
        console.log('cohorts:', cohorts);

        res.json({ data: cohorts });
        logRequest(req, res);
      } catch (e) {
        next(e);
      }
      console.groupEnd();
    }
  );

exports.router = router;

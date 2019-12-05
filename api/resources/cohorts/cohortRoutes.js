'use strict'

const express = require('express')
const router = express.Router()

const requiresAuth = require('../../middleware/auth')
const { logRequest } = require('../../utils')

const cohortService = require('./cohortService')

router.use(requiresAuth)

// GET /cohorts/
router.route('/')
  .get(async (req, res, next) => {
    try {
      const cohorts = await cohortService.listCohorts()
      res.json({ data: cohorts })
      logRequest(req, res)
    } catch (e) {
      next(e)
    }
  })
// POST /cohorts/ (create new cohort)
  .post(async (req, res, next) => {
    const { body } = req
    try {
      const cohort = await cohortService.createCohort(body)
      res.status(201).json({ data: [cohort] })
      logRequest(req, res)
    } catch (e) {
      next(e)
    }
  })

// PUT /cohorts/:cohortId
router.route('/:cohortId')
  .get(async (req, res, next) => {
    try {
      const { cohortId } = req.params
      const cohort = await cohortService.getCohortById(cohortId)
      if (cohort) {
        res.status(200).json({ data: [cohort] })
      } else {
        res.status(404).json({ data: [] })
      }
    } catch (e) {
      next(e)
    }
  })
  .put(async (req, res, next) => {
    try {
      const { cohortId } = req.params
      const { body } = req
      const cohort = await cohortService.updateCohort(cohortId, body)
      res.status(200).json({ data: [cohort] })
      logRequest(req, res)
    } catch (e) {
      next(e)
    }
  })

// GET /cohorts/:cohortId/students
router.route('/:cohortId/students')
  .get(async (req, res, next) => {
    console.group('CohortRoutes::GET /:cohortId/students')
    try {
      const { cohortId } = req.params
      const students = await cohortService.getCohortStudents(cohortId)

      res.json({ data: students })
      logRequest(req, res)
    } catch (e) {
      next(e)
    }
    console.groupEnd()
  })

exports.router = router

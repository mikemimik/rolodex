'use strict'

const express = require('express')
const router = express.Router()

const requiresAuth = require('../../middleware/auth')
const { logRequest } = require('../../utils')

const studentService = require('./studentService')

router.use(requiresAuth)

// GET /student/
router.route('/')
  .get(async (req, res, next) => {
    try {
      const students = await studentService.listStudents()
      res.json({ data: students })
      logRequest(req, res)
    } catch (e) {
      next(e)
    }
  })
// POST /student/ (creating a new student)
  .post(async (req, res, next) => {
    const { body } = req
    try {
      const student = await studentService.createStudent(body)
      res.status(201).json({ data: [student] })
      logRequest(req, res)
    } catch (e) {
      next(e)
    }
  })

// GET /student/:studentId
router.route('/:studentId')
  .get(async (req, res, next) => {
    try {
      const { studentId } = req.params
      const student = await studentService.getStudentById(studentId)
      if (student) {
        res.status(200).json({ data: [student] })
      } else {
        res.status(404).json({ data: [] })
      }
      logRequest(req, res)
    } catch (e) {
      next(e)
    }
  })
// PUT /student/:studentId (updating student)
  .put(async (req, res, next) => {
    try {

    } catch (e) {
      next(e)
    }
  })

// GET /student/:studentId/projects
router.route('/:studentId/projects')
  .get(async (req, res, next) => {
    try {
      const { studentId } = req.params
      const projects = await studentService.getStudentProjects(studentId)
      res.json({ data: projects })
      logRequest(req, res)
    } catch (e) {
      next(e)
    }
  })
// POST /student/:studentId/projects (create project)
  .post(async (req, res, next) => {
    try {
      const { studentId } = req.params
      const { body } = req
      const project = await studentService.createStudentProject(studentId, body)
      res.status(201).json({ data: [project] })
      logRequest(req, res)
    } catch (e) {
      next(e)
    }
  })

exports.router = router

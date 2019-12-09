'use strict'

const express = require('express')
const router = express.Router()

const requiresAuth = require('../../middleware/auth')
const { logRequest } = require('../../utils')

const projectService = require('./projectService')

router.use(requiresAuth)

// GET /projects/
router.route('/')
  .get(async (req, res, next) => {
    try {
      const projects = await projectService.listProjects()
      res.status(200).json({ data: projects })
      logRequest(req, res)
    } catch (e) {
      next(e)
    }
  })
// POST /projects/ (creating a new project)
  .post(async (req, res, next) => {
    const { body } = req
    try {
      const project = await projectService.createProject(body)
      res.status(201).json({ data: [project] })
      logRequest(req, res)
    } catch (e) {
      next(e)
    }
  })

module.exports.router = router

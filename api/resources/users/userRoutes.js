'use strict'

const express = require('express')
const router = express.Router()

const userService = require('./userService')
const tokenService = require('../../utils/tokenService')
const { logRequest } = require('../../utils')

const requiresAuth = require('../../middleware/auth')
const { HTTP401Error, HTTP400Error } = require('../../utils/httpErrors')

router.route('/')
  .post(async (req, res, next) => {
    try {
      const user = await userService.createUser(req.body)
      res.status(201).json({
        data: [user]
      })
      logRequest(req, res)
    } catch (e) {
      next(e)
    }
  })

router.route('/login')
  .post(async (req, res, next) => {
    try {
      const user = await userService.isUser(req.body)
      if (user) {
        const token = await tokenService.issueToken(user)
        res.status(200).json({
          data: [{
            token
          }]
        })
        logRequest(req, res)
      } else {
        next(new HTTP400Error())
      }
    } catch (e) {
      next(e)
    }
  })

router.route('/me')
  .get(
    requiresAuth,
    async (req, res, next) => {
      try {
        const { user: { id: userId } } = req.token
        const user = await userService.findUser(userId)
        if (!user) {
          next(new HTTP401Error())
        } else {
          res.status(200).json({ data: [user] })
          logRequest(req, res)
        }
      } catch (e) {
        next(e)
      }
    }
  )

exports.router = router

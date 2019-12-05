'use strict'

const { SECRET } = require('./constants')
const jwt = require('jsonwebtoken')

exports.issueToken = async (userData) => {
  const { _id: id } = userData

  const payload = {
    user: {
      id
    }
  }

  return jwt.sign(payload, SECRET)
}

exports.verifyToken = async (token) => {
  return jwt.verify(token, SECRET)
}

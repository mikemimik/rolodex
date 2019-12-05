'use strict'

const mongoose = require('mongoose')
const { Schema } = mongoose

const { schema: projectSchema } = require('../projects/projectModel')

const studentSchema = exports.schema = new Schema({
  firstName: String,
  lastName: String,
  avatar: String,
  projects: [projectSchema]
})

exports.model = mongoose.model('Students', studentSchema)

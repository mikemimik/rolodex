'use strict'

const mongoose = require('mongoose')
const { Schema } = mongoose

// const { schema: studentSchema } = require('../students/studentModel');

const projectSchema = exports.schema = new Schema({
  title: String,
  description: String,
  url: String
  // NOTE(mperrotte): this creates a circular dependency to studentModel.js
  // student: studentSchema,
})

exports.model = mongoose.model('Projects', projectSchema)

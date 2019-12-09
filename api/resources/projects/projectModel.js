'use strict'

const mongoose = require('mongoose')
const { Schema } = mongoose

const serializeFactory = require('../../utils/serialize')

const projectSchema = exports.schema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  url: String,
  student: {
    type: Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
  },
})

projectSchema.method('serialize', serializeFactory())

exports.model = mongoose.model('Project', projectSchema)

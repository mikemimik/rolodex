'use strict'

const mongoose = require('mongoose')
const { Schema } = mongoose

const serializeFactory = require('../../utils/serialize')

const projectSchema = exports.schema = new Schema({
  title: String,
  description: String,
  url: String,
  student: {
    type: Schema.Types.ObjectId,
    ref: 'Student'
  }
})

projectSchema.method('serialize', serializeFactory())

exports.model = mongoose.model('Project', projectSchema)

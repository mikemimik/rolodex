'use strict'

const mongoose = require('mongoose')
const { Schema } = mongoose

const serializeFactory = require('../../utils/serialize')

const cohortSchema = exports.schema = new Schema({
  year: Number,
  cohort: {
    type: String,
    enum: [
      'spring',
      'summer',
      'fall',
      'winter'
    ]
  },
  program: String,
  students: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Student'
    }
  ]
})

cohortSchema.method('serialize', serializeFactory())

exports.model = mongoose.model('Cohort', cohortSchema)

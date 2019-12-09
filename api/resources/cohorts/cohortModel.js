'use strict'

const mongoose = require('mongoose')
const { Schema } = mongoose

const serializeFactory = require('../../utils/serialize')

const cohortSchema = exports.schema = new Schema({
  year: {
    type: Number,
    required: true,
  },
  cohort: {
    type: String,
    enum: [
      'spring',
      'summer',
      'fall',
      'winter',
    ],
    required: true,
  },
  program: {
    type: String,
    required: true,
  },
  students: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Student',
    },
  ],
})

cohortSchema.method('serialize', serializeFactory())

exports.model = mongoose.model('Cohort', cohortSchema)

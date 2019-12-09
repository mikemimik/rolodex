'use strict'

const mongoose = require('mongoose')
const { Schema } = mongoose

const serializeFactory = require('../../utils/serialize')

const studentSchema = exports.schema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  avatar: String,
  projects: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Project',
    },
  ],
  cohorts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Cohort',
      required: true,
    },
  ],
})

studentSchema.method('serialize', serializeFactory())

exports.model = mongoose.model('Student', studentSchema)

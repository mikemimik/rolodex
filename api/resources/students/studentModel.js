'use strict'

const mongoose = require('mongoose')
const { Schema } = mongoose

const serializeFactory = require('../../utils/serialize')

const studentSchema = exports.schema = new Schema({
  firstName: String,
  lastName: String,
  avatar: String,
  projects: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Project'
    }
  ]
})

studentSchema.method('serialize', serializeFactory())

exports.model = mongoose.model('Student', studentSchema)

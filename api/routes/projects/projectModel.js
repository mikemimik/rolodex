'use strict';

const mongoose = require('mongoose');
const { Schema } = mongoose;

const { schema: studentSchema } = require('../students/studentModel');

const projectSchema = exports.schema = new Schema({
  title: String,
  description: String,
  url: String,
  // student: studentSchema,
});

exports.model = mongoose.model('Projects', projectSchema);

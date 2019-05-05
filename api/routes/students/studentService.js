'use strict';

const { model: Student } = require('./studentModel');

exports.listStudents = async () => {
  try {
    return await Student.find({});
  } catch (e) {
    throw e;
  }
};

'use strict';

const { model: Student } = require('./studentModel');

exports.listStudents = async () => {
  try {
    return Student.find({});
  } catch (e) {
    throw e;
  }
};


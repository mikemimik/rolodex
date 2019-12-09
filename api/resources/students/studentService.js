'use strict'

const { HTTP400Error } = require('../../utils/httpErrors')

const { model: Student } = require('./studentModel')
const { model: Cohort } = require('../cohorts/cohortModel')

exports.getStudentById = async (id) => {
  try {
    return Student.findById(id)
  } catch (e) {
    throw e
  }
}

exports.getStudentProjects = async (id) => {
  try {
    const student = await Student
      .findById(id)
      .populate('projects')
    return (student)
      ? student.projects
      : []
  } catch (e) {
    throw e
  }
}

exports.listStudents = async ({ filter, include } = { filter: {} }) => {
  try {
    if (Array.isArray(include) && include.length) {
      return include.reduce((acc, field) => {
        return acc.populate(field)
      }, Student.find(filter))
    } else {
      return Student.find(filter)
    }
  } catch (e) {
    throw e
  }
}

exports.createStudent = async (studentData) => {
  try {
    const { cohortId } = studentData
    if (cohortId) {
      const cohort = await Cohort.findById(cohortId)
      if (cohort) {
        const student = new Student(studentData)
        await student.validate()
        cohort.students.push(student._id)
        await cohort.save()
        return student.save()
      }
    }
    throw new HTTP400Error()
  } catch (e) {
    throw e
  }
}

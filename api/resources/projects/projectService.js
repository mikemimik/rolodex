'use strict'

const { HTTP400Error } = require('../../utils/httpErrors')

const { model: Project } = require('./projectModel')
const { model: Student } = require('../students/studentModel')

exports.listProjects = async ({ filter, include } = { filter: {} }) => {
  try {
    if (Array.isArray(include) && include.length) {
      return include.reduce((acc, field) => {
        return acc.populate(field)
      }, Project.find(filter))
    } else {
      return Project.find(filter)
    }
  } catch (e) {
    throw e
  }
}

exports.createProject = async (projectData) => {
  try {
    const { studentId, title, description, url } = projectData
    if (studentId) {
      const student = await Student.findById(studentId)
      if (student) {
        const serialized = {
          title,
          description,
          url,
          student: studentId,
        }
        const project = new Project(serialized)
        await project.validate()
        student.projects.push(project._id)
        await student.save()
        return project.save()
      }
    }
    throw new HTTP400Error()
  } catch (e) {
    throw e
  }
}

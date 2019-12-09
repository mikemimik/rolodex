'use strict'

const pMap = require('p-map')

const { model: Cohort } = require('../resources/cohorts/cohortModel')
const { model: Student } = require('../resources/students/studentModel')
const { model: Project } = require('../resources/projects/projectModel')
const { model: User } = require('../resources/users/userModel')

exports.truncate = async () => {
  await Cohort.deleteMany()
  await Student.deleteMany()
  await Project.deleteMany()
  await User.deleteMany()
  console.log('Truncation complete.')
}

exports.seed = async () => {
  try {
    const cohortData = [
      {
        year: 2019,
        cohort: 'winter',
        program: 'full-stack-master-class',
        students: [],
      },
      {
        year: 2018,
        cohort: 'fall',
        program: 'full-stack-master-class',
        students: [],
      },
    ]
    console.log('Seeding Cohort Data...')
    const cohorts = await pMap(cohortData, async (data) => {
      const cohort = new Cohort(data)
      await cohort.validate()
      return cohort.save()
    })
    const cohort = cohorts[0]

    const studentData = [
      {
        firstName: 'Michael',
        lastName: 'Perrotte',
        avatar: '',
        projects: [],
        cohorts: [cohort._id],
      },
      {
        firstName: 'Jamie',
        lastName: 'Scott',
        avatar: '',
        projects: [],
        cohorts: [cohort._id],
      },
    ]
    console.log('Seeding Student Data...')
    const students = await pMap(studentData, async (data) => {
      const student = new Student(data)
      await student.validate()
      return student.save()
    })
    const student = students[0]

    console.log('Updating Cohort Data (w/ Student Data)...')
    cohort.students = students.map((s) => s._id)
    await cohort.validate()
    await cohort.save()

    const projectData = [
      {
        title: 'rolodex',
        description: 'A tool used to track students I teach and the projects that they create.',
        url: 'https://mikemimik-rolodex.herokuapp.com',
        student: student._id,
      },
    ]
    console.log('Seeding Project Data...')
    const projects = await pMap(projectData, async (data) => {
      const project = new Project(data)
      await project.validate()
      return project.save()
    })

    console.log('Updated Student Data (w/ Project Data)...')
    const project = projects[0]
    student.projects.push(project._id)
    await student.validate()
    await student.save()

    const userData = [
      {
        email: 'test@test.com',
        password: 'testing',
      },
    ]
    console.log('Seeding User Data...')
    await pMap(userData, async (data) => {
      const user = new User(data)
      await user.validate()
      return user.save()
    })

    console.log('Seeding completed.')
  } catch (e) {
    console.error('Seeding failed...')
    throw e // This `throw` will be caught in the server.js file
  }
}

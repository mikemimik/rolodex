'use strict';

const { model: Cohort } = require('../routes/cohorts/cohortModel');
const { model: Student } = require('../routes/students/studentModel');
const { model: Project } = require('../routes/projects/projectModel');

exports.truncate = async () => {
  await Cohort.deleteMany();
  await Student.deleteMany();
  await Project.deleteMany();
};

exports.seed = async () => {
  try {
    const projectData = [
      {
        title: 'rolodex',
        description: 'A tool used to track students I teach and the projects that they create.',
        url: '',
      }
    ];
    const projectPromises = projectData.map(async (data) => {
      try {
        const project = new Project(data);
        return await project.save();
      } catch (e) {
        throw e;
      }
    });
    const projects = await Promise.all(projectPromises);

    const studentData = [
      {
        firstName: 'Michael',
        lastName: 'Perrotte',
        avatar: '',
        projects,
      }
    ];
    const studentPromises = studentData.map(async (data) => {
      try {
        const student = new Student(data);
        return await student.save();
      } catch (e) {
        throw e;
      }
    });
    const students = await Promise.all(studentPromises);

    const cohortData = [
      {
        year: 2019,
        cohort: 'winter',
        program: 'full-stack-master-class',
        students,
      }
    ];
    const cohortPromises = cohortData.map(async (data) => {
      try {
        const cohort = new Cohort(data);
        return await cohort.save();
      } catch (e) {
        throw e;
      }
    });
    const cohorts = await Promise.all(cohortPromises);

    console.log('Seeding completed.');
  } catch (e) {
    console.error('Seeding failed...');
    throw e; // This `throw` will be caught in the server.js file
  }
};

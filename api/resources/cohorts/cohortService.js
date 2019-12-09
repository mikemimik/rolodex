'use strict'

const { model: Cohort } = require('./cohortModel')

exports.getCohortById = async (id) => {
  try {
    return Cohort.findById(id)
  } catch (e) {
    throw e
  }
}

exports.getCohortStudents = async (id) => {
  try {
    const cohort = await Cohort
      .findById(id)
      .populate('students')
    return (cohort)
      ? cohort.students
      : []
  } catch (e) {
    throw e
  }
}

exports.listCohorts = async ({ filter, include } = { filter: {} }) => {
  try {
    if (Array.isArray(include) && include.length) {
      return include.reduce((acc, field) => {
        return acc.populate(field)
      }, Cohort.find(filter)).sort('-year')
    } else {
      return Cohort.find(filter).sort('-year')
    }
  } catch (e) {
    throw e
  }
}

exports.createCohort = async (cohortData) => {
  try {
    const cohort = new Cohort(cohortData)
    await cohort.validate()
    return cohort.save()
  } catch (e) {
    throw e
  }
}

exports.updateCohort = async (cohortId, cohortData) => {
  try {
    await Cohort.findByIdAndUpdate(cohortId, cohortData)
    const [nextCohort] = await exports.listCohorts({ filter: { _id: cohortId } })
    return nextCohort
  } catch (e) {
    throw e
  }
}

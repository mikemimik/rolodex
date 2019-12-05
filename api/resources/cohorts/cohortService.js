'use strict';

const { model: Cohort } = require('./cohortModel');

exports.listCohorts = async ({ filter, include } = { filter: {} }) => {
  try {
    if (include) {
      return await include.reduce((acc, field) => {
        return acc.populate(field);
      }, Cohort.find(filter)).sort('-year');
    }
    return Cohort.find(filter).sort('-year');
  } catch (e) {
    throw e;
  }
};

exports.createCohort = async (cohortData) => {
  try {
    const cohort = new Cohort(cohortData);
    return cohort.save();
  } catch (e) {
    throw e;
  }
};

exports.updateCohort = async (cohortId, cohortData) => {
  try {
    await Cohort.findByIdAndUpdate(cohortId, cohortData);
    const [nextCohort] = await exports.listCohorts({ filter: { _id: cohortId } });
    return nextCohort;
  } catch (e) {
    throw e;
  }
};

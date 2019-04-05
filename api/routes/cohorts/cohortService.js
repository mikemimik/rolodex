'use strict';

const { model: Cohort } = require('./cohortModel');

exports.listCohorts = async () => {
  return await Cohort.find({});
};

exports.createCohort = async (cohortData) => {
  try {
    const cohort = new Cohort(cohortData);
    return await cohort.save();
  } catch (e) {
    throw e;
  }
};

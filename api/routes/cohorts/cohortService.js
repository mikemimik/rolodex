'use strict';

const { model: Cohort } = require('./cohortModel');

exports.listCohorts = async () => {
  try {
    return await Cohort.find({});
  } catch (e) {
    throw e;
  }
};

exports.createCohort = async (cohortData) => {
  try {
    const cohort = new Cohort(cohortData);
    return await cohort.save();
  } catch (e) {
    throw e;
  }
};

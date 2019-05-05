'use strict';

const { model: Cohort } = require('./cohortModel');

exports.listCohorts = async ({ filter, include } = { filter: {} }) => {
  try {
    if (include) {
      return await include.reduce((acc, field) => {
        return acc.populate(field);
      }, Cohort.find(filter)).sort('-year');
    }
    return await Cohort.find(filter).sort('-year');
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

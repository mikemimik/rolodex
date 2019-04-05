import React, { Component, Fragment } from 'react';
import {
  uniqBy,
} from 'lodash';

import { withStyles } from '@material-ui/core/styles';

import Header from '../header/Header';
import Cohorts from '../cohort/Cohorts';

class App extends Component {
  state = {
    currentView: 'view',
    cohorts: [],
    cohortsById: {},
  };

  onFetchCohorts = (cohorts) => {
    const cohortsById = cohorts.reduce((acc, cohort) => {
      const { _id } = cohort;
      return Object.assign({}, acc, { [_id]: cohort });
    }, {});

    const currentCohorts = this.state.cohorts;
    const nextCohorts = uniqBy([...currentCohorts, ...cohorts], '_id');

    const currentCohortsById = this.state.cohortsById;
    const nextCohortsById = Object.assign({}, currentCohortsById, cohortsById);

    this.setState({
      cohorts: nextCohorts,
      cohortsById: nextCohortsById,
    });
  }

  handleTabChange = (event, value) => {
    this.setState({
      currentView: value,
    });
  }

  render () {
    return (
      <Fragment>
        <Header
          currentView={this.state.currentView}
          handleTabChange={this.handleTabChange}
        />
        {
          this.state.currentView === 'view' &&
          <Cohorts
            cohorts={this.state.cohorts}
            onFetchCohorts={this.onFetchCohorts}
          />
        }
      </Fragment>
    );
  }
}

export default App;

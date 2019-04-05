import React, { Component, Fragment } from 'react';

import { withStyles } from '@material-ui/core/styles';

import Header from '../header/Header';
import Cohorts from '../cohort/Cohorts';

class App extends Component {
  render () {
    return (
      <Fragment>
        <Header />
        <Cohorts />
      </Fragment>
    );
  }
}

export default App;

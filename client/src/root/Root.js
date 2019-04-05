import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import App from '../app/App';
import About from '../about/About';
import Cohort from '../cohort/Cohort';

class Root extends Component {
  render () {
    return (
      <Router>
        <Route exact path='/' component={App} />
        <Route exact path='/cohort/:cohortId' component={Cohort} />
        <Route exact path='/about' component={About} />
      </Router>
    );
  }
}

export default Root;

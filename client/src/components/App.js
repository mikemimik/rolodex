import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import { getToken } from '../services/tokenService';

import CreateCohort from './cohort/CreateCohort';
import Dashboard from './Dashboard';
import Cohort from './cohort/Cohort';
import Login from './Login';

class App extends Component {
  state = {
    user: null,
  };

  fetchUser = async () => {
    const token = getToken();

    if (token) {
      try {
        const response = await fetch('/api/users/me', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const { data } = await response.json();
        const [ user ] = data;
        this.setState({ user });
      } catch (e) {
        console.error('error:', e);
      }
    }
  }

  componentDidMount () {
    console.group('App::componentDidMount');
    this.fetchUser();
    console.groupEnd();
  }

  render () {
    return (
      <Router>
        <Switch>
          <Route
            exact path='/'
            render={(renderProps) => (
              (this.state.user)
                ? (<Redirect to='/cohorts' />)
                : (<Redirect to='/login' />)
            )}
          />
          <Route
            exact path='/login'
            render={(renderProps) => (
              (this.state.user)
                ? (<Redirect to='/cohorts' />)
                : (<Login fetchUser={this.fetchUser} />)
            )}
          />
          <Route
            exact path='/cohorts'
            render={(renderProps) => (
              (this.state.user)
                ? (<Dashboard {...renderProps} />)
                : (<Redirect to='/login' />)
            )}
          />
          <Route
            exact path='/cohorts/create'
            render={(renderProps) => (
              (this.state.user)
                ? (<CreateCohort {...renderProps} />)
                : (<Redirect to='/login' />)
            )}
          />
          <Route
            exact path='/cohorts/:cohortId'
            render={(renderProps) => (
              (this.state.user)
                ? (<Cohort {...renderProps} />)
                : (<Redirect to='/login' />)
            )}
          />
          <Route render={() => (<Redirect to='/' />)} />
        </Switch>
      </Router>
    );
  }
}

export default App;

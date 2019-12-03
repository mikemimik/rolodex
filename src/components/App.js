import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { get, uniqBy } from 'lodash';

import { getToken } from '../services/tokenService';

import CreateCohort from './cohort/CreateCohort';
import EditCohort from './cohort/EditCohort';
import Cohorts from './cohort/Cohorts';
import Cohort from './cohort/Cohort';
import EditStudent from './student/EditStudent';
import Student from './student/Student';
import Login from './Login';

class App extends Component {
  state = {
    user: null,
    cohorts: [],
    cohortsById: {},
    students: [],
    studentsById: {},
    studentsByCohortId: {},
    // projects: [],
    // projectsById: {},
    // projectsByStudentId: {},
  };

  fetchUser = async () => {
    console.group('App::fetchUser');
    const token = getToken();
    console.log('localStorage::token:', token);
    console.groupEnd();
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

  onFetchCohorts = (cohorts) => {
    console.group('App::onFetchCohorts');
    console.log('cohorts:', cohorts);
    const cohortsById = cohorts.reduce((acc, cohort) => {
      const { _id } = cohort;
      return Object.assign({}, acc, { [_id]: cohort });
    }, {});

    const currentCohorts = this.state.cohorts;
    const nextCohorts = uniqBy([...cohorts, ...currentCohorts], '_id');

    const currentCohortsById = this.state.cohortsById;
    const nextCohortsById = Object.assign({}, currentCohortsById, cohortsById);

    console.groupEnd();
    this.setState({
      cohorts: nextCohorts,
      cohortsById: nextCohortsById,
    });
  }

  onFetchStudents = (cohortId, students) => {
    const studentsById = students.reduce((acc, student) => {
      const { _id } = student;
      return Object.assign({}, acc, { [_id]: student });
    }, {});

    const currentStudents = this.state.students;
    const nextStudents = uniqBy([...students, ...currentStudents], '_id');

    const currentStudentsById = this.state.studentsById;
    const nextStudentsById = Object.assign({}, currentStudentsById, studentsById);

    // const currentStudentsByCohortId = this.state.studentsByCohortId[cohortId] || {};
    const studentsByCohortId = { [cohortId]: students };
    // const nextStudentsByCohortId = uniqBy([...currentStudentsByCohortId ]);

    this.setState({
      students: nextStudents,
      studentsById: nextStudentsById,
      studentsByCohortId,
    });
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
              (!this.state.user)
                ? (<Redirect to='/login' />)
                : (
                  <Cohorts
                    {...renderProps}
                    cohorts={this.state.cohorts}
                    onFetchCohorts={this.onFetchCohorts}
                  />
                )
            )}
          />
          <Route
            exact path='/cohorts/create'
            render={(renderProps) => (
              (!this.state.user)
                ? (<Redirect to='/login' />)
                : (
                  <CreateCohort
                    {...renderProps}
                  />
                )
            )}
          />
          <Route
            exact path='/cohorts/:cohortId'
            render={(renderProps) => {
              const cohortId = get(renderProps, 'match.params.cohortId');
              const cohortStudents = this.state.studentsByCohortId[cohortId] || [];
              return (!this.state.user)
                ? (<Redirect to='/login' />)
                : (
                  <Cohort
                    {...renderProps}
                    students={cohortStudents}
                    cohortsById={this.state.cohortsById}
                    onFetchStudents={this.onFetchStudents}
                  />
                );
            }}
          />
          <Route
            exact path='/cohorts/:cohortId/edit'
            render={(renderProps) => {
              // const cohortId = get(renderProps, 'match.params.cohortId');
              // const cohortStudents = this.state.studentsByCohortId[cohortId] || [];
              return (!this.state.user)
                ? (<Redirect to='/login' />)
                : (
                  <EditCohort
                    {...renderProps}
                    onFetchCohorts={this.onFetchCohorts}
                  />
                );
            }}
          />
          <Route
            exact path='/cohorts/:cohortId/students/:studentId/edit'
            render={(renderProps) => {
              return (!this.state.user)
                ? (<Redirect to='/login' />)
                : (
                  <EditStudent
                    {...renderProps}
                    onFetchStudents={this.onFetchStudents}
                  />
                );
            }}
          />
          <Route
            exact path='/cohorts/:cohortId/students/:studentId'
            render={(renderProps) => {
              const studentId = get(renderProps, 'match.params.studentId');
              const student = this.state.studentsById[studentId];
              return (!this.state.user)
                ? (<Redirect to='/login' />)
                : (!student)
                  ? (<Redirect to='/cohorts' />)
                  : (
                    <Student
                      {...renderProps}
                      student={student}
                      studentsById={this.state.studentsById}
                    />
                  );
            }}
          />
          <Route render={() => (<Redirect to='/' />)} />
        </Switch>
      </Router>
    );
  }
}

export default App;
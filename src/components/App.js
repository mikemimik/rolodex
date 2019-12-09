import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'
import { get, uniqBy } from 'lodash'

import { getToken, removeToken } from '../services/tokenService'

import CreateProject from './project/CreateProject'
import CreateStudent from './student/CreateStudent'
import CreateCohort from './cohort/CreateCohort'
import EditStudent from './student/EditStudent'
import EditCohort from './cohort/EditCohort'
import Cohorts from './cohort/Cohorts'
import Cohort from './cohort/Cohort'
import Student from './student/Student'
import Login from './Login'

class App extends Component {
  state = {
    user: null,
    cohorts: [],
    cohortsById: {},
    students: [],
    studentsById: {},
    studentsByCohortId: {},
    projects: [],
    projectsById: {},
    projectsByStudentId: {},
  };

  logoutUser = async () => {
    console.group('App::logoutUser')
    removeToken()
    console.log('localStorage::removedToken')
    console.groupEnd()
    this.setState({ user: null })
  }

  fetchUser = async () => {
    console.group('App::fetchUser')
    const token = getToken()
    console.log('localStorage::token:', token)
    console.groupEnd()
    if (token) {
      try {
        const response = await fetch('/api/users/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        const { data } = await response.json()
        const [user] = data
        this.setState({ user })
      } catch (e) {
        console.error('error:', e)
      }
    }
  }

  handleFetchCohorts = (cohorts) => {
    console.group('App::handleFetchCohorts')
    console.log('cohorts:', cohorts)
    const cohortsById = cohorts.reduce((acc, cohort) => {
      const { _id: cohortId } = cohort
      return Object.assign({}, acc, { [cohortId]: cohort })
    }, {})

    const currentCohorts = this.state.cohorts
    const nextCohorts = uniqBy([...cohorts, ...currentCohorts], '_id')

    const currentCohortsById = this.state.cohortsById
    const nextCohortsById = Object.assign({}, currentCohortsById, cohortsById)

    console.groupEnd()
    this.setState({
      cohorts: nextCohorts,
      cohortsById: nextCohortsById,
    })
  }

  handleFetchStudents = (cohortId, students) => {
    console.group('App::handleFetchStudents')
    console.log('cohortId:', cohortId)
    console.log('students:', students)
    const studentsById = students.reduce((acc, student) => {
      const { _id: studentId } = student
      return Object.assign({}, acc, { [studentId]: student })
    }, {})

    const currentStudents = this.state.students
    const nextStudents = uniqBy([...students, ...currentStudents], '_id')

    const currentStudentsById = this.state.studentsById
    const nextStudentsById = Object.assign({}, currentStudentsById, studentsById)

    const studentsByCohortId = { [cohortId]: students }

    const projectsByStudentId = students.reduce((acc, student) => {
      console.log('student:', student)
      const { _id: studentId, projects } = student
      return Object.assign({}, acc, { [studentId]: projects })
    }, {})

    const currentProjectsByStudentId = this.state.projectsByStudentId
    const nextProjectsByStudentId = Object.assign(
      {},
      projectsByStudentId,
      currentProjectsByStudentId,
    )

    console.groupEnd()
    this.setState({
      students: nextStudents,
      studentsById: nextStudentsById,
      studentsByCohortId,
      projectsByStudentId: nextProjectsByStudentId,
    })
  }

  handleFetchProjects = (studentId, projects) => {
    console.group('App::handleFetchProjects')
    console.log('studentId:', studentId)
    console.log('projects:', projects)
    const projectsById = projects.reduce((acc, project) => {
      const { _id: projectId } = project
      return Object.assign({}, acc, { [projectId]: project })
    }, {})

    const currentProjects = this.state.projects
    const nextProjects = uniqBy([...projects, ...currentProjects], '_id')

    const currentProjectsById = this.state.projectsById
    const nextProjectsById = Object.assign({}, currentProjectsById, projectsById)

    const projectsByStudentId = { [studentId]: projects }
    const currentProjectsByStudentId = this.state.projectsByStudentId
    const nextProjectsByStudentId = Object.assign(
      {},
      currentProjectsByStudentId,
      projectsByStudentId,
    )

    console.groupEnd()
    this.setState({
      projects: nextProjects,
      projectsById: nextProjectsById,
      projectsByStudentId: nextProjectsByStudentId,
    })
  }

  componentDidMount () {
    console.group('App::componentDidMount')
    this.fetchUser()
    console.groupEnd()
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
            exact path='/logout'
            render={(renderProps) => {
              removeToken()
              this.setState({ user: null })
              return <Redirect to='/login' />
            }}
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
                    onFetchCohorts={this.handleFetchCohorts}
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
                    onCreateCohort={this.handleFetchCohorts}
                  />
                )
            )}
          />
          <Route
            exact path='/cohorts/:cohortId'
            render={(renderProps) => {
              const cohortId = get(renderProps, 'match.params.cohortId')
              const cohortStudents = this.state.studentsByCohortId[cohortId] || []
              return (!this.state.user)
                ? (<Redirect to='/login' />)
                : (
                  <Cohort
                    {...renderProps}
                    cohort={this.state.cohortsById[cohortId]}
                    students={cohortStudents}
                    cohortsById={this.state.cohortsById}
                    onFetchStudents={this.handleFetchStudents}
                  />
                )
            }}
          />
          <Route
            exact path='/cohorts/:cohortId/edit'
            render={(renderProps) => {
              const cohortId = get(renderProps, 'match.params.cohortId')
              return (!this.state.user)
                ? (<Redirect to='/login' />)
                : (
                  <EditCohort
                    {...renderProps}
                    cohort={this.state.cohortsById[cohortId]}
                    onFetchCohorts={this.handleFetchCohorts}
                  />
                )
            }}
          />
          <Route
            exact path='/cohorts/:cohortId/students/create'
            render={(renderProps) => {
              const cohortId = get(renderProps, 'match.params.cohortId')
              return (!this.state.user)
                ? (<Redirect to='/login' />)
                : (
                  <CreateStudent
                    {...renderProps}
                    cohortId={cohortId}
                  />
                )
            }}
          />
          <Route
            exact path='/cohorts/:cohortId/students/:studentId'
            render={(renderProps) => {
              const studentId = get(renderProps, 'match.params.studentId')
              const cohortId = get(renderProps, 'match.params.cohortId')
              const student = this.state.studentsById[studentId]
              const projects = this.state.projectsByStudentId[studentId] || []
              return (!this.state.user)
                ? (<Redirect to='/login' />)
                : (!student)
                  ? (<Redirect to={`/cohorts/${cohortId}`} />)
                  : (
                    <Student
                      {...renderProps}
                      student={student}
                      projects={projects}
                      studentsById={this.state.studentsById}
                      onFetchProjects={this.handleFetchProjects}
                    />
                  )
            }}
          />
          <Route
            exact path='/cohorts/:cohortId/students/:studentId/projects/create'
            render={(renderProps) => {
              console.log('FELL IN HERE')
              const studentId = get(renderProps, 'match.params.studentId')
              const cohortId = get(renderProps, 'match.params.cohortId')
              return (!this.state.user)
                ? (<Redirect to='/login' />)
                : (
                  <CreateProject
                    {...renderProps}
                    studentId={studentId}
                    cohortId={cohortId}
                    onCreateProjects={this.handleFetchProjects}
                  />
                )
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
                    onFetchStudents={this.handleFetchStudents}
                  />
                )
            }}
          />
          <Route render={() => (<Redirect to='/' />)} />
        </Switch>
      </Router>
    )
  }
}

export default App

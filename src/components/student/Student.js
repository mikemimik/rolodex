import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { get } from 'lodash'

import { listTabs, handleTabChange } from '../Tabs'
import { getToken } from '../../services/tokenService'
import Project from '../project/Project'
import Header from '../Header'
import Page from '../Page'
import { Typography } from '@material-ui/core'

const styles = (theme) => ({
  root: {},
})

class Student extends PureComponent {
  renderHeader = (props) => (
    <Header
      currentView={false}
      handleTabChange={handleTabChange}
      appState={{
        student: this.props.studentsById[get(this.props, 'match.params.studentId')] || {},
        projects: this.props.projects,
      }}
      tabs={listTabs([
        'students.view',
        'students.edit',
        'projects.create',
        'app.logout',
      ])}
      {...props}
    />
  )

  handleFetchProjects = async () => {
    console.group('Student::handleFetchProjects')
    try {
      const token = getToken()
      const studentId = get(this.props, 'match.params.studentId')
      const response = await fetch(`/api/students/${studentId}/projects`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const projects = await response.json()
      this.props.onFetchProjects(studentId, projects.data)
      console.groupEnd()
    } catch (e) {
      console.error(e)
      console.groupEnd()
    }
  }

  componentDidMount () {
    console.group('Student::componentDidMount')
    this.handleFetchProjects()
    console.groupEnd()
  }

  render () {
    const { classes, student, projects } = this.props
    const { firstName, lastName } = student
    return (
      <>
        {this.renderHeader(this.props)}
        <Page title={`${firstName} ${lastName}`} className={classes.root}>
          <>
            <Typography key='title' variant='h2' gutterBottom>
            Projects
            </Typography>
            <>
              {
                projects.map((project) => (
                  <Project
                    key={`${(typeof project === 'string') ? project : project._id}`}
                    project={project}
                  />
                ))
              }
            </>
          </>
        </Page>
      </>
    )
  }
}

Student.propTypes = {
  classes: PropTypes.object,
  history: PropTypes.object,
  student: PropTypes.object,
  projects: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.arrayOf(PropTypes.object),
  ]),
  studentsById: PropTypes.object,
  onFetchProjects: PropTypes.func,
}

export default withStyles(styles)(Student)

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { get } from 'lodash'

import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemSecondaryAction,
  Avatar,
  Badge,
  Typography,
} from '@material-ui/core'
import {
  Folder as FolderIcon,
  Person as PersonIcon,
} from '@material-ui/icons'

import { listTabs, handleTabChange } from '../Tabs'
import { getToken } from '../../services/tokenService'
import Header from '../Header'
import Page from '../Page'

const styles = (theme) => ({
  root: {},
  margin: {
    margin: theme.spacing(2),
  },
  inline: {
    display: 'inline',
  },
})

class Cohort extends PureComponent {
  handleClickStudent = async (studentId) => {
    console.group('Cohort::handleClickStudent')
    console.log('studentId:', studentId)
    console.groupEnd()
    const { history } = this.props
    const cohortId = get(this.props, 'match.params.cohortId')
    return history.push({ pathname: `/cohorts/${cohortId}/students/${studentId}` })
  }

  handleFetchStudents = async () => {
    console.group('Cohort::handleFetchStudent')
    try {
      const token = getToken()
      const cohortId = get(this.props, 'match.params.cohortId')
      const response = await fetch(`/api/cohorts/${cohortId}/students`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const students = await response.json()
      this.props.onFetchStudents(cohortId, students.data)
      console.groupEnd()
    } catch (e) {
      console.error(e)
      console.groupEnd()
    }
  }

  renderHeader = (props) => (
    <Header
      currentView={false}
      handleTabChange={handleTabChange}
      appState={{
        cohort: this.props.cohortsById[get(this.props, 'match.params.cohortId')] || {},
      }}
      tabs={listTabs([
        'cohorts.view',
        'cohorts.edit',
        'students.create',
        'app.logout',
      ])}
      {...props}
    />
  )

  componentDidMount () {
    console.group('Cohort::componentDidMount')
    this.handleFetchStudents()
    console.groupEnd()
  }

  render () {
    const { classes, students, cohort } = this.props
    return (
      <>
        {this.renderHeader(this.props)}
        <Page title='Cohort Students'>
          <Typography component='h2' variant='h5'>
            {cohort.program}
          </Typography>
          <List>
            {
              students.map((student) => {
                return (
                  <ListItem
                    button
                    key={`${student._id}`}
                    onClick={(event) => {
                      this.handleClickStudent(student._id)
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar>
                        <PersonIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      disableTypography
                      primary={
                        <Typography variant='h4'>
                          {`${student.firstName}`}
                        </Typography>
                      }
                      secondary={
                        <>
                          <Typography component='span' className={classes.inline}>
                            {`${student.firstName}`}
                          </Typography>
                          {` - ${student.lastName}`}
                        </>
                      }
                    />
                    <ListItemSecondaryAction>
                      <Badge
                        className={classes.margin}
                        badgeContent={student.projects.length}
                        color='secondary'
                      >
                        <FolderIcon />
                      </Badge>
                    </ListItemSecondaryAction>
                  </ListItem>
                )
              })
            }
          </List>
        </Page>
      </>
    )
  }
}

Cohort.propTypes = {
  classes: PropTypes.object,
  cohort: PropTypes.object,
  students: PropTypes.arrayOf(PropTypes.object),
  cohortsById: PropTypes.object,
  onFetchStudents: PropTypes.func,
  history: PropTypes.object,
}

export default withStyles(styles)(Cohort)

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

import {
  Button,
  TextField,
} from '@material-ui/core'

import { listTabs, handleTabChange } from '../Tabs'
import { getToken } from '../../services/tokenService'
import Header from '../Header'
import Page from '../Page'

const styles = (theme) => ({
  root: {},
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  menu: {
    width: 200,
  },
})

class CreateStudent extends PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      nextProject: {
        title: '',
        description: '',
        url: '',
        studentId: props.studentId,
      },
    }
  }

  handleSubmit = async () => {
    try {
      const { history, cohortId, studentId } = this.props
      const { nextProject } = this.state
      const token = getToken()
      await fetch('/api/projects', {
        method: 'POST',
        body: JSON.stringify(nextProject),
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      return history.push({
        pathname: `/cohorts/${cohortId}/students/${studentId}`,
      })
    } catch (e) {
      console.error(e)
    }
  };

  handleInputChange = (prop) => ({ target: { id, value } }) => {
    console.groupEnd()
    const currentProject = this.state.nextProject
    const nextProject = { [prop]: value }
    this.setState({
      nextProject: Object.assign({}, currentProject, nextProject),
    })
  };

  renderHeader = (props) => (
    <Header
      currentView='projects.create'
      handleTabChange={handleTabChange}
      tabs={listTabs([
        'students.view',
        'projects.create',
      ])}
      {...props}
    />
  )

  componentDidMount () {
    console.group('CreateProject::componentDidMount')
    console.groupEnd()
  }

  render () {
    const { classes } = this.props
    return (
      <>
        {this.renderHeader(this.props)}
        <Page title='Create Project'>
          <form className={classes.container}>
            <TextField
              fullWidth
              id='title'
              label='Title'
              className={classes.textField}
              value={this.state.nextProject.title}
              onChange={this.handleInputChange('title')}
              helperText='Please enter a title'
            />
            <TextField
              fullWidth
              id='description'
              label='Description'
              className={classes.textField}
              value={this.state.nextProject.description}
              onChange={this.handleInputChange('description')}
              helperText='Please enter a description'
            />
            <TextField
              fullWidth
              id='url'
              label='Url'
              className={classes.textField}
              value={this.state.nextProject.url}
              onChange={this.handleInputChange('url')}
              helperText='Please enter a url'
            />
            <Button
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
              onClick={this.handleSubmit}
            >
              Create Project
            </Button>
          </form>
        </Page>
      </>
    )
  }
}

CreateStudent.propTypes = {
  classes: PropTypes.object,
  history: PropTypes.object,
  studentId: PropTypes.string,
  cohortId: PropTypes.string,
  onCreateProject: PropTypes.func,
}
export default withStyles(styles)(CreateStudent)

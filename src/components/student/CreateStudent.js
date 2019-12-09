import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

import {
  Button,
  MenuItem,
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
      nextStudent: {
        firstName: '',
        lastName: '',
        avatar: '',
        projects: [],
        cohortId: props.cohortId,
      },
    }
  }

  handleSubmit = async () => {
    try {
      const { history, cohortId } = this.props
      const { nextStudent } = this.state
      const token = getToken()
      console.log('nextStudent:', nextStudent)
      await fetch('/api/students', {
        method: 'POST',
        body: JSON.stringify(nextStudent),
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      return history.push({ pathname: `/cohorts/${cohortId}` })
    } catch (e) {
      console.error(e)
    }
  };

  handleInputChange = (prop) => ({ target: { id, value } }) => {
    console.groupEnd()
    const currentStudent = this.state.nextStudent
    const nextStudent = { [prop]: value }
    this.setState({
      nextStudent: Object.assign({}, currentStudent, nextStudent),
    })
  };

  renderHeader = (props) => (
    <Header
      currentView='students.create'
      handleTabChange={handleTabChange}
      tabs={listTabs([
        'students.view',
        'students.create',
      ])}
      {...props}
    />
  )

  render () {
    const { classes } = this.props
    return (
      <>
        {this.renderHeader(this.props)}
        <Page title='Create Student'>
          <form className={classes.container}>
            <TextField
              fullWidth
              id='firstName'
              label='First Name'
              className={classes.textField}
              value={this.state.nextStudent.firstName}
              onChange={this.handleInputChange('firstName')}
              helperText='Please enter first name'
            />
            <TextField
              fullWidth
              id='lastName'
              label='Last Name'
              className={classes.textField}
              value={this.state.nextStudent.lastName}
              onChange={this.handleInputChange('lastName')}
              helperText='Please enter last name'
            />
            <Button
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
              onClick={this.handleSubmit}
            >
              Create Student
            </Button>
          </form>
        </Page>
      </>
    )
  }
}

CreateStudent.propTypes = {
  classes: PropTypes.object,
  cohortId: PropTypes.string,
  history: PropTypes.object,
}
export default withStyles(styles)(CreateStudent)

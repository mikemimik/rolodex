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
export const CohortTypes = [
  'spring',
  'summer',
  'fall',
  'winter',
]

class CreateCohort extends PureComponent {
  state = {
    nextCohort: {
      cohort: '',
      program: '',
      year: '',
    },
  };

  handleSubmit = async () => {
    try {
      const { history } = this.props
      const { nextCohort } = this.state
      const token = getToken()
      const response = await fetch('/api/cohorts', {
        method: 'POST',
        body: JSON.stringify(nextCohort),
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      const cohort = await response.json()
      this.props.onCreateCohort(cohort.data)
      return history.push({ pathname: '/cohorts' })
    } catch (e) {
      console.error(e)
    }
  };

  handleInputChange = (prop) => ({ target: { id, value } }) => {
    console.groupEnd()
    const currentCohort = this.state.nextCohort
    const nextCohort = { [prop]: value }
    this.setState({
      nextCohort: Object.assign({}, currentCohort, nextCohort),
    })
  };

  renderHeader = (props) => (
    <Header
      currentView='cohorts.create'
      handleTabChange={handleTabChange}
      tabs={listTabs([
        'cohorts.view',
        'cohorts.create',
      ])}
      {...props}
    />
  )

  componentDidMount () {
    console.group('CreateCohort::componentDidMount')
    console.groupEnd()
  }

  render () {
    const { classes } = this.props
    return (
      <>
        {this.renderHeader(this.props)}
        <Page title='Create Cohort'>
          <form className={classes.container}>
            <TextField
              fullWidth
              id='program'
              label='Program Name'
              className={classes.textField}
              value={this.state.nextCohort.program}
              onChange={this.handleInputChange('program')}
              helperText='Please enter program name'
            />
            <TextField
              fullWidth
              id='year'
              label='Cohort Year'
              className={classes.textField}
              value={this.state.nextCohort.year}
              onChange={this.handleInputChange('year')}
              helperText='Please enter cohort year'
            />
            <TextField
              select
              fullWidth
              id='cohort'
              label='Cohort Type'
              className={classes.textField}
              value={this.state.nextCohort.cohort || CohortTypes[0]}
              onChange={this.handleInputChange('cohort')}
              SelectProps={{
                MenuProps: {
                  className: classes.menu,
                },
              }}
              helperText='Please select a cohort'
              margin='normal'
            >
              {CohortTypes.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
            <Button
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
              onClick={this.handleSubmit}
            >
              Create Cohort
            </Button>
          </form>
        </Page>
      </>
    )
  }
}

CreateCohort.propTypes = {
  classes: PropTypes.object,
  history: PropTypes.object,
  onCreateCohort: PropTypes.func,
}
export default withStyles(styles)(CreateCohort)

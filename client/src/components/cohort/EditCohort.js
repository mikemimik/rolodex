import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { get } from 'lodash';

import {
  Button,
  MenuItem,
  TextField,
} from '@material-ui/core';

import { listTabs, handleTabChange } from '../Tabs';
import { getToken } from '../../services/tokenService';
import Header from '../Header';
import Page from '../Page';

const styles = (theme) => ({
  root: {},
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  menu: {
    width: 200,
  },
});
export const CohortTypes = [
  'spring',
  'summer',
  'fall',
  'winter',
];

class EditCohort extends PureComponent {
  constructor (props) {
    super(props);
    const cohort = get(props, 'location.state.cohort', {
      cohort: null,
      program: '',
      year: null,
    });

    this.state = {
      cohort,
    };
  }

  submit = async () => {
    try {
      const { history } = this.props;
      const { cohort } = this.state;
      const token = getToken();
      const response = await fetch(`/api/cohorts/${cohort._id}`, {
        method: 'PUT',
        body: JSON.stringify(cohort),
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const cohorts = await response.json();
      console.log('cohorts:', cohorts);
      await this.props.onFetchCohorts(cohorts.data);
      return history.push({ pathname: '/cohorts' });
    } catch (e) {
      console.error(e);
    }
  };

  handleInputChange = (prop) => ({ target: { id, value } }) => {
    const currentCohort = this.state.cohort;
    const nextCohort = { [prop]: value };
    this.setState({
      cohort: Object.assign({}, currentCohort, nextCohort),
    });
  };

  renderHeader = (props) => (
    <Header
      currentView={'cohorts.create'}
      handleTabChange={handleTabChange}
      tabs={listTabs([
        'cohorts.view',
        'cohorts.create',
      ])}
      {...props}
    />
  )

  render () {
    const { classes } = this.props;
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
              value={this.state.cohort.program}
              onChange={this.handleInputChange('program')}
              helperText='Please enter program name'
            />
            <TextField
              fullWidth
              id='year'
              label='Cohort Year'
              className={classes.textField}
              value={this.state.cohort.year}
              onChange={this.handleInputChange('year')}
              helperText='Please enter cohort year'
            />
            <TextField
              select
              fullWidth
              id='cohort'
              label='Cohort Type'
              className={classes.textField}
              value={this.state.cohort.cohort || CohortTypes[0]}
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
              onClick={this.submit}
            >
              Edit Cohort
            </Button>
          </form>
        </Page>
      </>
    );
  }
}

EditCohort.propTypes = {
  classes: PropTypes.object,
  history: PropTypes.object,
  onFetchCohorts: PropTypes.func,
};

export default withStyles(styles)(EditCohort);

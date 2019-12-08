import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { get } from 'lodash';

import {
  Button,
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
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  menu: {
    width: 200,
  },
});

class EditStudent extends PureComponent {
  constructor (props) {
    super(props);
    const student = get(props, 'location.state.student', {
      firstName: '',
      lastName: '',
    });

    this.state = {
      student,
    };
  }

  submit = async () => {
    try {
      const { history } = this.props;
      const { student } = this.state;
      const token = getToken();
      const cohortId = get(this.props, 'match.params.cohortId');
      const response = await fetch(`/api/students/${student._id}`, {
        method: 'PUT',
        body: JSON.stringify(student),
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const students = await response.json();
      console.log('students:', students);
      await this.props.onFetchStudents(cohortId, students.data);
      return history.push({ pathname: `/cohorts/${cohortId}` });
    } catch (e) {
      console.error(e);
    }
  };

  handleInputChange = (prop) => ({ target: { id, value } }) => {
    const currentStudent = this.state.student;
    const nextStudent = { [prop]: value };
    this.setState({
      student: Object.assign({}, currentStudent, nextStudent),
    });
  };

  renderHeader = (props) => (
    <Header
      currentView={false}
      handleTabChange={handleTabChange}
      tabs={listTabs([
        'students.view',
      ])}
      {...props}
    />
  )

  render () {
    const { classes } = this.props;
    return (
      <>
        {this.renderHeader(this.props)}
        <Page title='Edit Student'>
          <form className={classes.container}>
            <TextField
              fullWidth
              id='firstName'
              label='First Name'
              className={classes.textField}
              value={this.state.student.firstName}
              onChange={this.handleInputChange('firstName')}
            />
            <TextField
              fullWidth
              id='lastName'
              label='Last Name'
              className={classes.textField}
              value={this.state.student.lastName}
              onChange={this.handleInputChange('lastName')}
            />
            <Button
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
              // onClick={this.submit}
            >
              Edit Cohort
            </Button>
          </form>
        </Page>
      </>
    );
  }
}

EditStudent.propTypes = {
  classes: PropTypes.object,
  history: PropTypes.object,
  onFetchStudents: PropTypes.func,
};

export default withStyles(styles)(EditStudent);

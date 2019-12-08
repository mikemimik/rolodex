import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemSecondaryAction,
  Avatar,
  Badge,
  Typography,
} from '@material-ui/core';
import {
  Bookmark as BookmarkIcon,
  Person as PersonIcon,
} from '@material-ui/icons';

import { listTabs, handleTabChange } from '../Tabs';
import Header from '../Header';
import Page from '../Page';

import { getToken } from '../../services/tokenService';

const styles = (theme) => ({
  root: {},
  margin: {
    margin: theme.spacing(2),
  },
  inline: {
    display: 'inline',
  },
});

class Cohorts extends PureComponent {
  handleClickCohort = (id) => {
    const { history } = this.props;
    return history.push({ pathname: `/cohorts/${id}` });
  }

  handleFetchCohorts = async () => {
    try {
      const token = getToken();
      const response = await fetch('/api/cohorts', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const cohorts = await response.json();
      this.props.onFetchCohorts(cohorts.data);
    } catch (e) {
      console.error(e);
    }
  }

  renderHeader = (props) => (
    <Header
      currentView={false}
      handleTabChange={handleTabChange}
      tabs={listTabs([
        'cohorts.create',
      ])}
      {...props}
    />
  )

  componentDidMount () {
    console.group('Cohorts::componentDidMount');
    this.handleFetchCohorts();
    console.groupEnd();
  }

  componentWillUnmount () {
    console.group('Cohorts::componentWillUnmount');
    console.groupEnd();
  }

  render () {
    const { classes, cohorts } = this.props;
    return (
      <>
        {this.renderHeader(this.props)}
        <Page title='Cohorts'>
          <List>
            {
              cohorts.map((cohort) => {
                return (
                  <ListItem
                    button
                    key={`${cohort.year}-${cohort.cohort}-${cohort.program}`}
                  >
                    <ListItemAvatar>
                      <Avatar>
                        <BookmarkIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      disableTypography
                      primary={
                        <Typography variant='h4'>
                          {`${cohort.program}`}
                        </Typography>
                      }
                      secondary={
                        <React.Fragment>
                          <Typography component='span' className={classes.inline}>
                            {`${cohort.year}`}
                          </Typography>
                          {` - ${cohort.cohort}`}
                        </React.Fragment>
                      }
                      onClick={(event) => {
                        this.handleClickCohort(cohort._id);
                      }}
                    />
                    <ListItemSecondaryAction>
                      <Badge
                        className={classes.margin}
                        badgeContent={cohort.students.length}
                        color='secondary'
                      >
                        <PersonIcon />
                      </Badge>
                    </ListItemSecondaryAction>
                  </ListItem>
                );
              })
            }
          </List>
        </Page>
      </>
    );
  }
}

Cohorts.propTypes = {
  classes: PropTypes.object,
  cohorts: PropTypes.arrayOf(PropTypes.object),
  cohortsById: PropTypes.object,
  onFetchCohorts: PropTypes.func,
  history: PropTypes.object,
};

export default withStyles(styles)(Cohorts);

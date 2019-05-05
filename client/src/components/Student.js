import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import { listTabs, handleTabChange } from './Tabs';
import Header from './Header';
import Page from './Page';

const styles = (theme) => ({
  root: {},
});

class Student extends PureComponent {
  renderHeader = (props) => (
    <Header
      currentView={false}
      handleTabChange={handleTabChange}
      tabs={listTabs([
        'students.view',
        'projects.create',
      ])}
      {...props}
    />
  );

  render () {
    const { classes } = this.props;
    return (
      <>
        {this.renderHeader(this.props)}
        <Page title='Student' className={classes.root}>
          <div />
        </Page>
      </>
    );
  }
}

Student.propTypes = {
  classes: PropTypes.object,
  student: PropTypes.object,
  history: PropTypes.object,
};

export default withStyles(styles)(Student);

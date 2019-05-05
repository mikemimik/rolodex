import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';

import { listTabs, handleTabChange } from '../Tabs';
import Header from '../Header';
import Page from '../Page';

const styles = (theme) => ({
  root: {},
});

class CreateCohort extends PureComponent {
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
    return (
      <>
        {this.renderHeader(this.props)}
        <Page title='Create Cohort'>
          <div />
        </Page>
      </>
    );
  }
}

export default withStyles(styles)(CreateCohort);

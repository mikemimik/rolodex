import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';

import { CohortTabs, handleTabChange } from './CohortTabs';
import Header from '../Header';
import Page from '../Page';

const styles = (theme) => ({
  root: {},
});

class CreateCohort extends PureComponent {
  renderHeader = (props) => (
    <Header
      currentView={'create'}
      handleTabChange={handleTabChange}
      tabs={CohortTabs}
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

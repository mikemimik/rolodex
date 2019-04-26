import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
  root: {},
});

class Cohort extends PureComponent {
  render () {
    return (
      <>
        Cohort
      </>
    );
  }
}

export default withStyles(styles)(Cohort);

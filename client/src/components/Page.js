import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import {
  Grid,
  Paper,
  Typography,
} from '@material-ui/core';

const styles = (theme) => ({
  root: {
    paddingTop: theme.spacing.unit * 2,
  },
  page: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  grid: {
    flexGrow: 1,
  },
});

class Page extends PureComponent {
  renderItemGrid = (items) => {
    const { classes } = this.props;
    return (
      <Grid container className={classes.grid}>
        <Grid item xs={12}>
          <Grid container justify='center' spacing={16}>
            {
              items.map((child, index) => (
                <Grid key={index} item>
                  {child}
                </Grid>
              ))
            }
          </Grid>
        </Grid>
      </Grid>
    );
  }

  render () {
    const {
      items,
      title,
      classes,
      children,
    } = this.props;

    return (
      <div className={classes.root}>
        <Paper className={classes.page}>
          <Typography variant='h6' className={classes.header}>
            {title}
          </Typography>
          { items && this.renderItemGrid(items) }
          { children }
        </Paper>
      </div>
    );
  }
}

Page.propTypes = {
  items: PropTypes.arrayOf(PropTypes.element),
  title: PropTypes.string,
  classes: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
};

export default withStyles(styles)(Page);

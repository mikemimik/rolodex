import React, { PureComponent } from 'react';

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
  Folder as FolderIcon,
  Person as PersonIcon,
} from '@material-ui/icons';

const styles = (theme) => ({
  margin: {
    margin: theme.spacing.unit * 2,
  },
  inline: {
    display: 'inline',
  },
});

class Cohorts extends PureComponent {
  state = {
    cohorts: [
      {
        year: 2019,
        cohort: 'winter',
        program: 'full-stack-master-class',
        students: [
          { firstName: 'bob' },
        ],
      },
      {
        year: 2019,
        cohort: 'spring',
        program: 'full-stack-master-class',
        students: [
          { firstName: 'bob' },
          { firstName: 'wendy' },
        ],
      },
      {
        year: 2019,
        cohort: 'summer',
        program: 'full-stack-master-class',
        students: [
          { firstName: 'bob' },
        ],
      },
      {
        year: 2019,
        cohort: 'fall',
        program: 'full-stack-master-class',
        students: [],
      },
    ]
  };

  render () {
    const { classes } = this.props;
    return (
      <List>
        {
          this.state.cohorts.map((cohort) => {
            return (
              <ListItem
                button
                key={`${cohort.year}-${cohort.cohort}`}
                onClick={(event) => console.log(event)}
              >
                <ListItemAvatar>
                  <Avatar>
                    <FolderIcon />
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
    );
  }
}

export default withStyles(styles)(Cohorts);

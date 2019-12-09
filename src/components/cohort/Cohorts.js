import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemSecondaryAction,
  Avatar,
  Badge,
  Typography,
} from '@material-ui/core'
import {
  Bookmark as BookmarkIcon,
  Person as PersonIcon,
} from '@material-ui/icons'

import { listTabs, handleTabChange } from '../Tabs'
import Header from '../Header'
import Page from '../Page'

import { getToken } from '../../services/tokenService'

const styles = (theme) => ({
  root: {},
  margin: {
    margin: theme.spacing(2),
  },
  inline: {
    display: 'inline',
  },
})

class Cohorts extends PureComponent {
  handleClickCohort = (id) => {
    console.group('Cohorts::handleClickCohort')
    console.log('cohortId:', id)
    console.groupEnd()
    const { history } = this.props
    return history.push({ pathname: `/cohorts/${id}` })
  }

  handleFetchCohorts = async () => {
    console.group('Cohorts::handleFetchCohorts')
    try {
      const token = getToken()
      const response = await fetch('/api/cohorts', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const cohorts = await response.json()
      this.props.onFetchCohorts(cohorts.data)
      console.groupEnd()
    } catch (e) {
      console.error(e)
      console.groupEnd()
    }
  }

  renderHeader = (props) => (
    <Header
      currentView={false}
      handleTabChange={handleTabChange}
      tabs={listTabs([
        'cohorts.create',
        'app.logout',
      ])}
      {...props}
    />
  )

  componentDidMount () {
    console.group('Cohorts::componentDidMount')
    this.handleFetchCohorts()
    console.groupEnd()
  }

  render () {
    const { classes, cohorts } = this.props
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
                        <>
                          <Typography component='span' className={classes.inline}>
                            {`${cohort.year}`}
                          </Typography>
                          {` - ${cohort.cohort}`}
                        </>
                      }
                      onClick={(event) => {
                        this.handleClickCohort(cohort._id)
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
                )
              })
            }
          </List>
        </Page>
      </>
    )
  }
}

Cohorts.propTypes = {
  classes: PropTypes.object,
  cohorts: PropTypes.arrayOf(PropTypes.object),
  cohortsById: PropTypes.object,
  onFetchCohorts: PropTypes.func,
  history: PropTypes.object,
}

export default withStyles(styles)(Cohorts)

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

import {
  Card,
  CardContent,
  Link,
  Typography,
} from '@material-ui/core'

const styles = (theme) => ({
  root: {},
})

class Project extends PureComponent {
  componentDidMount () {
    console.group('Project::componentDidMount')
    console.groupEnd()
  }

  render () {
    const { classes, project } = this.props
    return (
      <Card className={classes.root}>
        <CardContent>
          <Typography variant='h4' gutterBottom>
            {project.title}
          </Typography>
          <Typography component='h2' variant='body1' gutterBottom>
            {project.description}
          </Typography>
          <Link href={project.url}>
            <Typography variant='overline' display='block' gutterBottom>
              {project.url}
            </Typography>
          </Link>
        </CardContent>
      </Card>
    )
  }
}

Project.propTypes = {
  classes: PropTypes.object,
  project: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
  ]),
}

export default withStyles(styles)(Project)

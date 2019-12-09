import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import {
  AppBar,
  Tabs,
} from '@material-ui/core'

class Header extends PureComponent {
  render () {
    const {
      currentView,
      tabs,
      handleTabChange,
      appState,
    } = this.props

    return (
      <AppBar position='static' color='default'>
        <Tabs
          value={currentView}
          onChange={(event, value) => {
            console.group('Header::onChange')
            console.log('this:', this)
            console.log('appState:', appState)
            console.groupEnd()
            handleTabChange.call(this, event, value, appState)
          }}
          indicatorColor='primary'
          textColor='primary'
          centered
        >
          {tabs}
        </Tabs>
      </AppBar>
    )
  }
}

Header.propTypes = {
  currentView: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  tabs: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
  handleTabChange: PropTypes.func,
  appState: PropTypes.object,
}

export default Header

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import {
  AppBar,
  Tabs,
} from '@material-ui/core';

class Header extends PureComponent {
  render () {
    const {
      currentView,
      tabs,
      handleTabChange,
    } = this.props;

    return (
      <AppBar position='static' color='default'>
        <Tabs
          value={currentView}
          onChange={(event, value) => {
            handleTabChange.call(this, event, value);
          }}
          indicatorColor='primary'
          textColor='primary'
          centered
        >
          {tabs}
        </Tabs>
      </AppBar>
    );
  }
}

Header.propTypes = {
  currentView: PropTypes.string,
  tabs: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
  handleTabChange: PropTypes.func,
};

export default Header;

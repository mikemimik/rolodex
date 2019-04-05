import React, { PureComponent } from 'react';
import {
  Redirect,
} from 'react-router-dom';

import {
  AppBar,
  Tabs,
  Tab,
} from '@material-ui/core';
import {
  Phone as PhoneIcon,
  Favorite as FavoriteIcon,
  PersonPin as PersonPinIcon,
  ChromeReaderMode as ReaderIcon,
  AddCircle as AddCircleIcon,
} from '@material-ui/icons';

class Header extends PureComponent {
  render () {
    const {
      currentView,
      handleTabChange,
    } = this.props;

    return (
      <AppBar position='static' color='default'>
        <Tabs
          value={currentView}
          onChange={handleTabChange}
          indicatorColor='primary'
          textColor='primary'
          centered
        >
          <Tab label='View Cohorts' value='view' icon={<ReaderIcon />} />
          <Tab label='Add Cohort' value='create' icon={<AddCircleIcon />} />
          <Tab label='Item Three' value='three' icon={<PersonPinIcon />} />
        </Tabs>
      </AppBar>
    );
  }
}

export default Header;

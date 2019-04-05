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
  state = {
    value: 'view',
  };

  handleTabChange = (event, value) => {
    console.log('event:', event);
    console.log('value:', value);
    this.setState({ value });
  }

  render () {
    return (
      <AppBar position='static' color='default'>
        <Tabs
          value={this.state.value}
          onChange={this.handleTabChange}
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

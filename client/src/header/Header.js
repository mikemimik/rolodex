import React, { PureComponent } from 'react';
import {
  Redirect,
} from 'react-router-dom';

import {
  AppBar,
  Tabs,
  Tab,
} from '@material-ui/core';
import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';

class Header extends PureComponent {
  state = {
    value: null,
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
          <Tab label='Item One' value='one' icon={<PhoneIcon />} />
          <Tab label='Item Two' value='two' icon={<FavoriteIcon />} />
          <Tab label='Item Three' value='three' icon={<PersonPinIcon />} />
        </Tabs>
      </AppBar>
    );
  }
}

export default Header;

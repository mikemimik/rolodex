import React, { PureComponent } from 'react';
import { Redirect } from 'react-router-dom';

import { removeToken } from '../services/tokenService';

class Logout extends PureComponent {
  componentDidMount (props, state) {
    console.group('Logout::componentDidMount');
    console.log('props:', props);
    console.log('state:', state);
    console.groupEnd();
    removeToken();
    this.setState({ user: null });
  }

  render () {
    return <Redirect to='/' />;
  }
}

export default Logout;

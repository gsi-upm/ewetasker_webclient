import React, { Component } from 'react';
import { Redirect } from 'react-router';
class Logout extends Component {
  render() {
    if (sessionStorage.getItem('jwtToken')!==null) {
      sessionStorage.removeItem('jwtToken');
      return <Redirect push to="/login" />;
    }
    return <Redirect push to="/login" />;
  }
}

export default Logout;

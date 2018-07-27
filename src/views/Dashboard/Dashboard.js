import React, { Component } from 'react';
import { Redirect } from 'react-router';


class Dashboard extends Component {

  render() {
    
    if (sessionStorage.getItem('jwtToken')===null) {
      return <Redirect push to="/login" />;
  }

    return (
      <div className="animated fadeIn">
        
      </div>
    );
  }
}

export default Dashboard;

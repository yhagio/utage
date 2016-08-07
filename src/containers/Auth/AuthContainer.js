import React, { PropTypes } from 'react';

const AuthContainer = React.createClass({
  clicked() {
    new Notification('Event detail updated', {
      body: 'The location has been changed due to an urgent issue at the building',
      icon: '../../images/iconmonstr-info-6-64.png'
    });
  },

  render() {
    return (
      <div>
        Auth
        <button onClick={ this.clicked }>CLICK</button>
      </div>
    );
  }
});

export default AuthContainer;
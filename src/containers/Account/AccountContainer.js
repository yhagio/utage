import React, { PropTypes } from 'react';

const AccountContainer = React.createClass({
  componentDidMount() {

  },

  ask() {
    // Initialize Notification
    if ("Notification" in window) {
      if (Notification.permission === 'default') {
        Notification.requestPermission();
      } else if (Notification.permission === 'granted') {
        console.log('Notification is permitted')
      } else {
        console.log('Notification is denied')
      }
    } else {
      console.log('Notification is not supported')
    }
  },

  notify() {
    if (Notification.permission === 'granted') {
      new Notification('Event detail updated', {
        body: 'The location has been changed due to an urgent issue at the building',
        icon: '../../images/iconmonstr-info-6-64.png'
      });
    } else {
      console.log('Ask Permission first');
    }
  },

  render() {
    return (
      <div>
        <button onClick={this.ask}>Ask</button>
        <button onClick={this.notify}>Notify</button>
      </div>
    );
  }
});

export default AccountContainer;
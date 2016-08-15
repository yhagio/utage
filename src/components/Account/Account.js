import React, { PropTypes } from 'react';
import {
  container,
  notifyButton
} from './styles.css';

ToggleButton.propTypes = {
  requestPermission: PropTypes.func.isRequired
};

function ToggleButton (props) {
  if ('Notification' in window) {
    if (Notification.permission === 'default') {
      return (
          <div>
            <p>Would you like to get notified when a new event is available?</p>
            <button
              onClick={ props.requestPermission }
              role='button'
              className={ notifyButton }>Enable Notification</button>
          </div>
        );
    } else if (Notification.permission === 'granted') {
      return <p>Notification is enabled</p>;
    } else {
      return <p>Notification is disabled</p>;
    }
  } else {
    return <p>Notification is not supported ...</p>;
  }
}

Account.propTypes = {
  status: PropTypes.string.isRequired,
  handleUpdateNotification: PropTypes.func.isRequired
};

export default function Account (props) {
  function requestPermission () {
    // Request Notification
    if ('Notification' in window) {
      if (Notification.permission === 'default') {
        Notification.requestPermission()
          .then((newStatus) => {
            console.log('newStatus', newStatus);
            return props.handleUpdateNotification(newStatus);
          });
      } else if (Notification.permission === 'granted') {
        console.log('Notification is permitted');
      } else {
        console.log('Notification is denied');
      }
    } else {
      console.log('Notification is not supported');
    }
  }

  return (
    <div className={ container }>
      <ToggleButton requestPermission={ requestPermission }/>
    </div>
  );
}


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
  // debugger;
  function requestPermission () {
    // Request Notification
    if ('Notification' in window) {
      if (Notification.permission === 'default') {
        Notification.requestPermission()
          .then((newStatus) => rops.handleUpdateNotification(newStatus))
          .catch((error) => console.warn('requestPermission failed', error));
      } else if (Notification.permission === 'granted') {
        console.log('Notification is permitted');
      } else {
        console.log('Notification is denied');
      }
    } else {
      console.log('Notification is not supported');
    }
  }

  return props.isFetching === true || props.user.size === undefined
  ? <h2>Fetching</h2>
  : (
    <div className={ container }>
      <div>
        <p>{ props.user.get('name')}</p>
        <img src={ props.user.get('photoURL')} />
      </div>
      <ToggleButton requestPermission={ requestPermission }/>
    </div>
  );
}


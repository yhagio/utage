import React, { PropTypes } from 'react'
import {
  container
} from './styles.css'

Account.propTypes = {
  
};

export default function Account (props) {
  function ask() {
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
  }
  
  return (
    <div className={ container }>
      <p>Would you like to get notified when a new event is available?</p>
      <button 
        onClick={ ask }
        role="button">Enable Notification</button>
    </div>
  )
}




import React, { PropTypes } from 'react';
import Nav from '../Nav/NavContainer';
import { main } from './styles.css'

const MainContainer = React.createClass({
  componentDidMount() {
    if ("Notification" in window) {
      if (Notification.permission === 'default') {
        Notification.requestPermission();
      } else if (Notification.permission === 'granted') {
        console.log('Granted')
      } else {
        console.log('denied')
      }
    } else {
      console.log('Notification not supported')
    }
  },

  render() {
    return (
      <div className={ main }>
        <Nav />
        { this.props.children }
      </div>
    );
  }
});

export default MainContainer;
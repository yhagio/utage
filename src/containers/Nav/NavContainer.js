import React, { PropTypes } from 'react';
import Nav from '../Nav/NavContainer';
import {
  navigation,
  menu,
  menuItem
} from './styles.css';

const NavContainer = React.createClass({
  render() {
    return (
      <nav className={ navigation } role="navigation">
        <ul
          id="navigation"
          className={ menu }>
          <a
            className={ menuItem }
            role="button"
            href="/#">Home</a>          
          <a
            className={ menuItem }
            role="button"
            href="/#/signup">Sign up</a>
          <a
            className={ menuItem }
            role="button"
            href="/#/signin">Sign in</a>  
          <a
            className={ menuItem }
            role="button"
            href="/#/events/10">Sign out</a>
          <a
            className={ menuItem }
            role="button"
            href="/#/events/10">Create event</a>
          <a
            className={ menuItem }
            role="button"
            href="/#/events/10">Account</a>
        </ul>
      </nav>
    );
  }
});

export default NavContainer;
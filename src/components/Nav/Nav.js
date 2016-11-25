import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import {
  navigation,
  title,
  menu,
  menuItem
} from './styles.css';

Navigation.propTypes = Links.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
};

export function Links ({ isAuthenticated }) {
  return isAuthenticated === true
    ? <ul
        id='navigation'
        className={ menu }>
        <p className={ title }>Party Planner</p>
        <Link
          className={ menuItem }
          role='button'
          tabIndex='4'
          to='account'>Account</Link>
        <Link
          className={ menuItem }
          role='button'
          tabIndex='3'
          to='signout'>Log out</Link>
        <Link
          className={ menuItem }
          role='button'
          tabIndex='2'
          to='new-event'>New event</Link>
        <Link
          className={ menuItem }
          role='button'
          tabIndex='1'
          to='/'>Events</Link>
      </ul>
    : <ul
        id='navigation'
        className={ menu }>
        <p className={ title }>Party Planner</p>
        <Link
          className={ menuItem }
          role='button'
          tabIndex='2'
          to='authenticate'>Log in</Link>
        <Link
          className={ menuItem }
          role='button'
          tabIndex='1'
          to='/'>Home</Link>
      </ul>;
}

export default function Navigation ({ isAuthenticated }) {
  return (
    <nav className={ navigation } role='navigation'>
      <Links isAuthenticated={ isAuthenticated } />
    </nav>
  );
}


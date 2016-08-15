import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import {
  navigation,
  menu,
  menuItem
} from './styles.css';

Navigation.propTypes = Links.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
};

function Links ({ isAuthenticated }) {
  return isAuthenticated === true
    ? <ul
        id='navigation'
        className={ menu }>
        <Link
          className={ menuItem }
          role='button'
          to='/'>Home</Link>
        <Link
          className={ menuItem }
          role='button'
          to='new-event'>New event</Link>
        <Link
          className={ menuItem }
          role='button'
          to='signout'>Sign out</Link>
        <Link
          className={ menuItem }
          role='button'
          to='account'>Account</Link>
      </ul>
    : <ul
        id='navigation'
        className={ menu }>
        <Link
          className={ menuItem }
          role='button'
          to='/'>Home</Link>
        <Link
          className={ menuItem }
          role='button'
          to='authenticate'>Sign in</Link>
      </ul>;
}

export default function Navigation ({ isAuthenticated }) {
  return (
    <nav className={ navigation } role='navigation'>
      <Links isAuthenticated={ isAuthenticated } />
    </nav>
  );
}


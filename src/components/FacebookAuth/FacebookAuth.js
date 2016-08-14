import React, { PropTypes } from 'react'
import {
  fbButton
} from './styles.css'

FacebookAuth.propTypes = {
  onAuth: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
};

export default function FacebookAuth ({ onAuth, isFetching }) {
  return (
    <button onClick={ onAuth } className={ fbButton } role="button">
      {isFetching === true
        ? 'Loading'
        : 'Sign in via facebook'}
    </button>
  )
}

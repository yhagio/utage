import React, { PropTypes } from 'react'

FacebookAuth.propTypes = {
  onAuth: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
};

export default function FacebookAuth ({ onAuth, isFetching }) {
  return (
    <button onClick={ onAuth } className=''>
      {isFetching === true
        ? 'Loading'
        : 'Login with facebook'}
    </button>
  )
}

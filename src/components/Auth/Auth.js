import React, { PropTypes } from 'react';
import { FacebookAuth } from 'components';

Auth.propTypes = {
  error: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  onAuth: PropTypes.func.isRequired,
}

export default function Auth ({ onAuth, isFetching, error }) {
  return (
    <div className=''>
      <h1 className=''>{'facebook authentication'}</h1>
      <FacebookAuth
        isFetching={ isFetching }
        onAuth={ onAuth } />
        { error ?
          <p className=''>{error}</p>
          : null}
    </div>
  )
}
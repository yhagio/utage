import React, { PropTypes } from 'react';
import { FacebookAuth } from 'components';
import { errorStyle } from './styles.css';

Auth.propTypes = {
  error: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  onAuth: PropTypes.func.isRequired
};

export default function Auth ({ onAuth, isFetching, error }) {
  return (
    <div className=''>
      <FacebookAuth
        isFetching={ isFetching }
        onAuth={ onAuth } />
        { error
          ? <h3 className={ errorStyle }>{ error }</h3>
          : null }
    </div>
  );
}

import React, { PropTypes } from 'react';
import { 
  labeled,
  inputField,
  submitButton
} from './styles.css';

const NewEventContainer = React.createClass({
  render() {
    return (
      <form onSubmit={ (e) => console.log() }>
        <h2>NEW EVENT</h2>

        <hr />

        <span id='errForm' className='error'></span>

        <label className={ labeled }>Comment<br />
          <input
            id='comment'
            name='comment'
            placeholder='comment'
            className={ inputField }
            type='text'
            required={ true } />
        </label>

        <button
          action='submit'
          className={ submitButton }
          role="button">Submit</button>
      </form>
    );
  }
});

export default NewEventContainer;
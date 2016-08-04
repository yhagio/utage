import React, { PropTypes } from 'react';

const NewEventContainer = React.createClass({
  render() {
    return (
      <form onSubmit={ handleFormSubmit }>
        {/*<h2>NEW EVENT</h2>

        <hr />

        <span id='errReviewForm' className='error'></span>

        <label className={ labeled }>Review Comment<br />
          <input
            id='title'
            name='title'
            placeholder='Title'
            className={ inputField }
            type='text'
            required={ true } />
        </label>

        <button
          action='submit'
          className={ submitButton }
          role="button">Submit</button>*/}
      </form>
    );
  }
});

export default NewEventContainer;
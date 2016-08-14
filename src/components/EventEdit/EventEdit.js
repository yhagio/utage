import React, { PropTypes } from 'react';
import {
  container,
  labeled,
  inputField,
  textareaField,
  selectOption,
  submitButton
} from './styles.css';

const { string, func, bool, array, object, number } = PropTypes;

EventEdit.propTypes = {
  event: object.isRequired,
  eventHost: object.isRequired,
  isFetching: bool.isRequired,
  error: string.isRequired
};

export default function EventEdit (props) {  
  console.log(props)

  function handleFormSubmit (e) {
    e.preventDefault();
    return props.updateEvent(props.event.eventId, {
      uid: props.event.uid,
      title: props.event.title,
      description: props.event.description,
      address: props.event.address,
      price: props.event.price,
      startDate: props.event.startDate,
      endDate: props.event.endDate,
      category: props.event.category,
      timestamp: Date.now()
    });
  }
  
  return props.isFetching === true
    ? <h3>Loading event data ...</h3>
    : (
  <form onSubmit={ handleFormSubmit } className={ container }>
      <h2>{'New Event'}</h2>
      <hr />
      <label className={ labeled }>Title<br />
        <input
          id='title'
          name='title'
          placeholder='Event Title'
          value={ props.event.title }
          onChange={ (e) => console.log(e.target.value) }
          className={ inputField }
          type='text'
          required={ true } />
      </label>

      <label className={ labeled }>Description<br />
        <textarea
          id='description'
          name='description'
          placeholder='Description within 600 characters'
          value={ props.event.description }
          onChange={ (e) => console.log(e.target.value) }
          className={ textareaField }
          rows='10'
          type='text'
          maxLength={600}
          required={ true } />
      </label>

      <label className={ labeled }>Address<br />
        <input
          id='address'
          name='address'
          placeholder='Address'
          value={ props.event.address }
          onChange={ (e) => console.log(e.target.value) }
          className={ inputField }
          type='text'
          autoComplete="street-address"
          required={ true } />
      </label>

      <label className={ labeled }>Price ($)<br />
        <input
          id='price'
          name='price'
          placeholder='0 if it is FREE'
          value={ props.event.price }
          onChange={ (e) => console.log(parseInt(e.target.value)) }
          className={ inputField }
          type='Number'
          min={0}
          required={ true } />
      </label>

      <label className={ labeled }>Start Date<br />
        <input
          id='startDate'
          name='startDate'
          value={ props.event.startDate }
          onChange={ (e) => console.log(e.target.value) }
          className={ inputField }
          type='datetime-local'
          required={ true } />
      </label>

      <label className={ labeled }>End Date<br />
        <input
          id='endDate'
          name='endDate'
          value={ props.event.endDate }
          onChange={ (e) => console.log(e.target.value) }
          className={ inputField }
          type='datetime-local'
          required={ true } />
      </label>

      <label htmlFor="category" className={ labeled }>Category</label>
      <select
        id="category"
        name="category"
        value={ props.event.category }
        className={ selectOption }
        onChange={ (e) => console.log(e.target.value) } >

        <option value='Social'>Social</option>
        <option value='Birthday'>Birthday</option>
        <option value='Celebration'>Celebration</option>
        <option value='Networking'>Networking</option>
        <option value='Sports'>Sports</option>
        <option value='Conference'>Conference</option>

      </select>

      <button
        action='submit'
        className={ submitButton }
        role="button">Submit</button>
    </form>
    );
}

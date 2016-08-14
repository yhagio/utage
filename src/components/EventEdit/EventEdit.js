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
  error: string.isRequired,
  title: string.isRequired,
  description: string.isRequired,
  address: string.isRequired,
  price: number.isRequired,
  startDate: string.isRequired,
  endDate: string.isRequired,
  category: string.isRequired,
  updateTitle: func.isRequired,
  updateDescription: func.isRequired,
  updateAddress: func.isRequired,
  updatePrice: func.isRequired,
  updateStartDate: func.isRequired,
  updateEndDate: func.isRequired,
  updateCategory: func.isRequired,
  handleUpdateEvent: func.isRequired
};

export default function EventEdit (props) {  
  function handleFormSubmit (e) {
    e.preventDefault();
    return props.handleUpdateEvent(props.event.eventId, {
      uid: props.event.uid,
      eventId: props.event.eventId,
      title: props.title || props.event.title,
      description: props.description || props.event.description,
      address: props.address || props.event.address,
      limit: 100,
      price: props.price || props.event.price,
      startDate: props.startDate || props.event.startDate,
      endDate: props.endDate || props.event.endDate,
      category: props.category || props.event.category,
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
          value={ props.title || props.event.title }
          onChange={ (e) => props.updateTitle(e.target.value) }
          className={ inputField }
          type='text'
          required={ true } />
      </label>

      <label className={ labeled }>Description<br />
        <textarea
          id='description'
          name='description'
          placeholder='Description within 600 characters'
          value={ props.description || props.event.description }
          onChange={ (e) => props.updateDescription(e.target.value) }
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
          value={ props.address || props.event.address }
          onChange={ (e) => props.updateAddress(e.target.value) }
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
          value={ props.price || props.event.price }
          onChange={ (e) => props.updatePrice(parseInt(e.target.value)) }
          className={ inputField }
          type='Number'
          min={0}
          required={ true } />
      </label>

      <label className={ labeled }>Start Date<br />
        <input
          id='startDate'
          name='startDate'
          value={ props.startDate || props.event.startDate }
          onChange={ (e) => props.updateStartDate(e.target.value) }
          className={ inputField }
          type='datetime-local'
          required={ true } />
      </label>

      <label className={ labeled }>End Date<br />
        <input
          id='endDate'
          name='endDate'
          value={ props.endDate || props.event.endDate }
          onChange={ (e) => props.updateEndDate(e.target.value) }
          className={ inputField }
          type='datetime-local'
          required={ true } />
      </label>

      <label htmlFor="category" className={ labeled }>Category</label>
      <select
        id="category"
        name="category"
        value={ props.category || props.event.category }
        className={ selectOption }
        onChange={ (e) => props.updateCategory(e.target.value) } >

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
        role="button">Update</button>
    </form>
    );
}

import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import {
  container,
  labeled,
  inputField,
  textareaField,
  selectOption,
  submitButton
} from './styles.css';

const { string, func, number, bool } = PropTypes;

NewEventForm.propTypes = {
  updateTitle: func.isRequired,
  updateDescription: func.isRequired,
  updateAddress: func.isRequired,
  updatePrice: func.isRequired,
  updateLimit: func.isRequired,
  updateStartDate: func.isRequired,
  updateEndDate: func.isRequired,
  updateCategory: func.isRequired,
  uid: string.isRequired,
  title: string.isRequired,
  description: string.isRequired,
  address: string.isRequired,
  price: number.isRequired,
  limit: number.isRequired,
  startDate: string.isRequired,
  endDate: string.isRequired,
  category: string.isRequired,
  error: string.isRequired,
  createEvent: func.isRequired
};

export default function NewEventForm (props) {
  function handleFormSubmit (e) {
    e.preventDefault();
    return props.createEvent({
      uid: props.uid,
      title: props.title,
      description: props.description,
      address: props.address,
      price: props.price,
      limit: props.limit,
      startDate: props.startDate,
      endDate: props.endDate,
      category: props.category,
      timestamp: Date.now()
    });
  }

  return (
    <form onSubmit={ handleFormSubmit } className={ container }>
      <h2>{'New Event'}</h2>
      <hr />
      <label className={ labeled }>Title<br />
        <input
          id='title'
          name='title'
          placeholder='Event Title'
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
          onChange={ (e) => props.updateDescription(e.target.value) }
          className={ textareaField }
          rows='5'
          type='text'
          maxLength={600}
          required={ true } />
      </label>

      <label className={ labeled }>Address<br />
        <input
          id='address'
          name='address'
          placeholder='Address'
          onChange={ (e) => props.updateAddress(e.target.value) }
          className={ inputField }
          type='text'
          autoComplete="street-address"
          required={ true } />
      </label>

      <label className={ labeled }>Price<br />
        <input
          id='price'
          name='price'
          placeholder='0 if it is FREE'
          onChange={ (e) => props.updatePrice(parseInt(e.target.value)) }
          className={ inputField }
          type='Number'
          min={0}
          required={ true } />
      </label>

      <label className={ labeled }>Limit of attendants<br />
        <input
          id='limit'
          name='limit'
          placeholder='Limit number'
          onChange={ (e) => props.updateLimit(parseInt(e.target.value)) }
          className={ inputField }
          type='number'
          min={0}
          required={ true } />
      </label>

      <label className={ labeled }>Start Date<br />
        <input
          id='startDate'
          name='startDate'
          onChange={ (e) => props.updateStartDate(e.target.value) }
          className={ inputField }
          type='datetime-local'
          required={ true } />
      </label>

      <label className={ labeled }>End Date<br />
        <input
          id='endDate'
          name='endDate'
          onChange={ (e) => props.updateEndDate(e.target.value) }
          className={ inputField }
          type='datetime-local'
          required={ true } />
      </label>

      <label htmlFor="category" className={ labeled }>Category</label>
      <select
        id="category"
        name="category"
        value={ props.category }
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
        role="button">Submit</button>
    </form>
  );
}

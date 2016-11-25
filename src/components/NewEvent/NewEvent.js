import React, { PropTypes } from 'react';

import {
  container,
  title,
  labeled,
  inputField,
  textareaField,
  selectOption,
  submitButton,
  error,
  noSubmit
} from './styles.css';

const { string, func, number, bool, object } = PropTypes;

NewEventForm.propTypes = {
  updateTitle: func.isRequired,
  updateDescription: func.isRequired,
  updateAddress: func.isRequired,
  updatePrice: func.isRequired,
  updateStartDate: func.isRequired,
  updateEndDate: func.isRequired,
  updateCategory: func.isRequired,
  authedUser: object.isRequired,
  title: string.isRequired,
  description: string.isRequired,
  address: string.isRequired,
  price: number.isRequired,
  startDate: string.isRequired,
  endDate: string.isRequired,
  category: string.isRequired,
  error: string.isRequired,
  createEvent: func.isRequired,

  titleError: string.isRequired,
  warnTitleError: func.isRequired,
  descriptionError: string.isRequired,
  warnDescriptionError: func.isRequired,
  addressError: string.isRequired,
  warnAddressError: func.isRequired,
  startDateError: string.isRequired,
  warnStartDateError: func.isRequired,
  endDateError: string.isRequired,
  warnEndDateError: func.isRequired
};

export function SubmitButton (props) {
  if (
    props.titleError ||
    props.descriptionError ||
    props.addressError ||
    props.startDateError ||
    props.endDateError
  ) {
    return (
      <button
        action='submit'
        disabled={ "disabled" }
        className={ noSubmit }
        role='button'>Cannot Submit</button>
    )
  } else {
    return (
      <button
        action='submit'
        className={ submitButton }
        role='button'>Submit</button>
    )
  }
}

export default function NewEventForm (props) {
  function handleFormSubmit (e) {
    e.preventDefault();
    return props.createEvent({
      uid: props.authedUser.get('uid'),
      title: props.title,
      description: props.description,
      address: props.address,
      price: props.price || 0,
      startDate: props.startDate,
      endDate: props.endDate,
      category: props.category || 'Social',
      timestamp: Date.now()
    });
  }

  return props.authedUser.size === 0
  ? <h2>Loading</h2>
  :(
    <form onSubmit={ handleFormSubmit } className={ container }>
      <h2 className={ title }>New Event</h2>
      <hr />
      <label className={ labeled }>Title*<br />
        <input
          id='title'
          name='title'
          placeholder='Event Title'
          onChange={ (e) => props.updateTitle(e.target.value) }
          onBlur={ (e) => e.target.value.length === 0 ? props.warnTitleError(e.target.value): null } 
          className={ inputField }
          type='text'
          maxLength={ 50 }
          required={ true }
          autoFocus />
      </label>
      <span className={ error }>{ props.titleError ? props.titleError: ''}</span>

      <label className={ labeled }>Description*<br />
        <textarea
          id='description'
          name='description'
          placeholder='Description within 600 characters'
          onChange={ (e) => props.updateDescription(e.target.value) }
          onBlur={ (e) => e.target.value.length === 0 ? props.warnDescriptionError(e.target.value): null }
          className={ textareaField }
          rows='5'
          type='text'
          maxLength={ 600 }
          required={ true } />
      </label>
      <span className={ error }>{ props.descriptionError ? props.descriptionError: ''}</span>

      <label className={ labeled }>Address*<br />
        <input
          id='address'
          name='address'
          placeholder='Address'
          onChange={ (e) => props.updateAddress(e.target.value) }
          onBlur={ (e) => e.target.value.length === 0 ? props.warnAddressError(e.target.value): null }
          className={ inputField }
          type='text'
          autoComplete='street-address'
          required={ true } />
      </label>
      <span className={ error }>{ props.addressError ? props.addressError: ''}</span>

      <label className={ labeled }>Price ($)<br />
        <input
          id='price'
          name='price'
          placeholder='0 if it is FREE'
          onChange={ (e) => props.updatePrice(parseInt(e.target.value)) }
          className={ inputField }
          type='Number'
          min={ 0 } />
      </label>

      <label className={ labeled }>Start Date*<br />
        <input
          id='startDate'
          name='startDate'
          onChange={ (e) => props.updateStartDate(e.target.value) }
          onBlur={ (e) => e.target.value.length === 0 ? props.warnStartDateError(e.target.value): null }
          className={ inputField }
          type='datetime-local'
          required={ true } />
      </label>
      <span className={ error }>{ props.startDateError ? props.startDateError: ''}</span>

      <label className={ labeled }>End Date*<br />
        <input
          id='endDate'
          name='endDate'
          onChange={ (e) => props.updateEndDate(e.target.value) }
          onBlur={ (e) => e.target.value.length === 0 ? props.warnEndDateError(e.target.value): null }
          className={ inputField }
          type='datetime-local'
          required={ true } />
      </label>
      <span className={ error }>{ props.endDateError ? props.endDateError: ''}</span>

      <label htmlFor='category' className={ labeled }>Category</label>
      <select
        id='category'
        name='category'
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

      <SubmitButton
        titleError={ props.titleError }
        descriptionError={ props.descriptionError }
        addressError={ props.addressError }
        startDateError={ props.startDateError}
        endDateError={ props.endDateError } />
    </form>
  );
}

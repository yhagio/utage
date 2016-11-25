import React, { PropTypes } from 'react';
import { Map } from 'immutable';
import {
  container,
  pageTitle,
  labeled,
  inputField,
  textareaField,
  selectOption,
  submitButton,
  deleteButton,
  noSubmit,
  error
} from './styles.css';

const { string, func, bool, object, number } = PropTypes;

EventEdit.propTypes = {
  event: PropTypes.instanceOf(Map),
  eventHost: PropTypes.instanceOf(Map),
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
  handleUpdateEvent: func.isRequired,
  handleDeleteEvent: func.isRequired,

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
        role='button'>Cannot Update</button>
    )
  } else {
    return (
      <button
        action='submit'
        className={ submitButton }
        role='button'>Update</button>
    )
  }
}

export default function EventEdit (props) {
  function handleFormSubmit (e) {
    e.preventDefault();
    return props.handleUpdateEvent(props.event.get('eventId'), {
      uid: props.event.get('uid'),
      eventId: props.event.get('eventId'),
      title: props.title || props.event.get('title'),
      description: props.description || props.event.get('description'),
      address: props.address || props.event.get('address'),
      limit: 100,
      price: props.price || 0,
      startDate: props.startDate || props.event.get('startDate'),
      endDate: props.endDate || props.event.get('endDate'),
      category: props.category || props.event.get('category'),
      timestamp: Date.now()
    });
  }

  function handleRemoval (e) {
    e.preventDefault();
    return props.handleDeleteEvent(props.event.get('eventId'), props.event);
  }

  return props.isFetching === true
    ? <h2>Loading event data</h2>
    : <form onSubmit={ handleFormSubmit } className={ container }>
        <h2 className={ pageTitle }>Edit Event</h2>
        <hr />
        <label className={ labeled }>Title<br />
          <input
            id='title'
            name='title'
            placeholder='Event Title'
            value={ props.title || props.event.get('title') }
            onChange={ (e) => props.updateTitle(e.target.value) }
            onBlur={ (e) => e.target.value.length === 0 ? props.warnTitleError(e.target.value): null }
            className={ inputField }
            maxLength={ 50 }
            type='text'
            required={ true }
            autoFocus />
        </label>
        <span className={ error }>{ props.titleError ? props.titleError: ''}</span>

        <label className={ labeled }>Description<br />
          <textarea
            id='description'
            name='description'
            placeholder='Description within 600 characters'
            value={ props.description || props.event.get('description') }
            onChange={ (e) => props.updateDescription(e.target.value) }
            onBlur={ (e) => e.target.value.length === 0 ? props.warnDescriptionError(e.target.value): null }
            className={ textareaField }
            rows='10'
            type='text'
            maxLength={ 600 }
            required={ true } />
        </label>
        <span className={ error }>{ props.descriptionError ? props.descriptionError: ''}</span>

        <label className={ labeled }>Address<br />
          <input
            id='address'
            name='address'
            placeholder='Address'
            value={ props.address || props.event.get('address') }
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
            value={ props.price || 0 }
            onChange={ (e) => props.updatePrice(parseInt(e.target.value)) }
            className={ inputField }
            type='Number'
            min={ 0 }
            required={ true } />
        </label>

        <label className={ labeled }>Start Date<br />
          <input
            id='startDate'
            name='startDate'
            value={ props.startDate || props.event.get('startDate') }
            onChange={ (e) => props.updateStartDate(e.target.value) }
            onBlur={ (e) => e.target.value.length === 0 ? props.warnStartDateError(e.target.value): null }
            className={ inputField }
            type='datetime-local'
            required={ true } />
        </label>
        <span className={ error }>{ props.startDateError ? props.startDateError: ''}</span>

        <label className={ labeled }>End Date<br />
          <input
            id='endDate'
            name='endDate'
            value={ props.endDate || props.event.get('endDate') }
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
          value={ props.category || props.event.get('category') }
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

        <button
          id="delete"
          className={ deleteButton }
          onClick={ handleRemoval }
          role='button'>DELETE</button>
      </form>;
}


import { Map } from 'immutable';
import { saveEvent } from '../../helpers/firebaseAPI';
import { hashHistory } from 'react-router';

export const UPDATE_TITLE = 'UPDATE_TITLE';
export const UPDATE_DESCRIPTION = 'UPDATE_DESCRIPTION';
export const UPDATE_ADDRESS = 'UPDATE_ADDRESS';
export const UPDATE_PRICE = 'UPDATE_PRICE';
// export const UPDATE_LIMIT = 'UPDATE_LIMIT';
export const UPDATE_START_DATE = 'UPDATE_START_DATE';
export const UPDATE_END_DATE = 'UPDATE_END_DATE';
export const UPDATE_CATEGORY = 'UPDATE_CATEGORY';
export const SUBMITTED_SUCCESSFULLY = 'SUBMITTED_SUCCESSFULLY';
export const SUBMISSION_ERROR = 'SUBMISSION_ERROR';

export const TITLE_ERROR = 'TITLE_ERROR';
export const DESCRIPTION_ERROR = 'DESCRIPTION_ERROR';
export const ADDRESS_ERROR = 'ADDRESS_ERROR';
export const START_DATE_ERROR = 'START_DATE_ERROR';
export const END_DATE_ERROR = 'END_DATE_ERROR';

// Actions
export function updateTitle (title) {
  return {
    type: UPDATE_TITLE,
    title
  };
}

export function updateDescription (description) {
  return {
    type: UPDATE_DESCRIPTION,
    description
  };
}

export function updateAddress (address) {
  return {
    type: UPDATE_ADDRESS,
    address
  };
}

export function updatePrice (price) {
  return {
    type: UPDATE_PRICE,
    price
  };
}

// export function updateLimit (limit) {
//   return {
//     type: UPDATE_LIMIT,
//     limit
//   };
// }

export function updateStartDate (startDate) {
  return {
    type: UPDATE_START_DATE,
    startDate
  };
}

export function updateEndDate (endDate) {
  return {
    type: UPDATE_END_DATE,
    endDate
  };
}

export function updateCategory (category) {
  return {
    type: UPDATE_CATEGORY,
    category
  };
}

export function submittedSuccessfully () {
  return {
    type: SUBMITTED_SUCCESSFULLY
  };
}

export function submissionError (error) {
  console.error('Submission Error: ', error);
  return {
    type: SUBMISSION_ERROR,
    error: 'Submision failed'
  };
}

// Form Error Actions
export function warnTitleError() {
  return {
    type: TITLE_ERROR,
    titleError: 'Title is required'
  };
}

export function warnDescriptionError() {
  return {
    type: DESCRIPTION_ERROR,
    descriptionError: 'Description is required'
  };
}

export function warnAddressError() {
  return {
    type: ADDRESS_ERROR,
    addressError: 'Address is required'
  };
}

export function warnStartDateError() {
  return {
    type: START_DATE_ERROR,
    startDateError: 'Start Date is required'
  };
}

export function warnEndDateError() {
  return {
    type: END_DATE_ERROR,
    endDateError: 'End Date is required'
  };
}


// Handlers
export function createEvent (event) {
  return function (dispatch) {
    saveEvent(event)
      .then((eventWithId) => {
        dispatch(submittedSuccessfully());
        // Redirect after submitted successfully
        hashHistory.push('/');
      })
      .catch((error) => {
        dispatch(submissionError(error));
      });
  };
}

const initialState = Map({
  title: '',
  description: '',
  address: '',
  price: 0,
  startDate: '',
  endDate: '',
  category: 'Social',
  error: '',
  titleError: '',
  descriptionError: '',
  addressError: '',
  startDateError: '',
  endDateError: ''
});

// reducer
export default function eventFormReducer (state = initialState, action) {
  switch (action.type) {

    case UPDATE_TITLE:
      return state.merge({
        title: action.title,
        titleError: ''
      });

    case UPDATE_DESCRIPTION:
      return state.merge({
        description: action.description,
        descriptionError: ''
      });

    case UPDATE_ADDRESS:
      return state.merge({
        address: action.address,
        addressError: ''
      });

    case UPDATE_PRICE:
      return state.merge({
        price: action.price
      });

    case UPDATE_START_DATE:
      return state.merge({
        startDate: action.startDate,
        startDateError: ''
      });

    case UPDATE_END_DATE:
      return state.merge({
        endDate: action.endDate,
        endDateError: ''
      });

    case UPDATE_CATEGORY:
      return state.merge({
        category: action.category
      });

    // Form Errors
    case TITLE_ERROR:
      return state.merge({
        titleError: action.titleError,
      });

    case DESCRIPTION_ERROR:
      return state.merge({
        descriptionError: action.descriptionError,
      });

    case ADDRESS_ERROR:
      return state.merge({
        addressError: action.addressError,
      });

    case START_DATE_ERROR:
      return state.merge({
        startDateError: action.startDateError,
      });

    case END_DATE_ERROR:
      return state.merge({
        endDateError: action.endDateError,
      });
    
    // Successfully Submitted
    case SUBMITTED_SUCCESSFULLY:
      return state.merge({
        title: '',
        description: '',
        address: '',
        price: 0,
        startDate: '',
        endDate: '',
        category: '',
        error: '',
        titleError: ''
      });

    case SUBMISSION_ERROR:
      return state.merge({
        error: action.error
      });

    default:
      return state;
  }
}


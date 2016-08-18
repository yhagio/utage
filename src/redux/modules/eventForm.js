import { saveEvent } from '../../helpers/firebaseAPI';
import { hashHistory } from 'react-router';

const UPDATE_TITLE = 'UPDATE_TITLE';
const UPDATE_DESCRIPTION = 'UPDATE_DESCRIPTION';
const UPDATE_ADDRESS = 'UPDATE_ADDRESS';
const UPDATE_PRICE = 'UPDATE_PRICE';
const UPDATE_LIMIT = 'UPDATE_LIMIT';
const UPDATE_START_DATE = 'UPDATE_START_DATE';
const UPDATE_END_DATE = 'UPDATE_END_DATE';
const UPDATE_CATEGORY = 'UPDATE_CATEGORY';
const SUBMITTED_SUCCESSFULLY = 'SUBMITTED_SUCCESSFULLY';
const SUBMISSION_ERROR = 'SUBMISSION_ERROR';

const TITLE_ERROR = 'TITLE_ERROR';
const DESCRIPTION_ERROR = 'DESCRIPTION_ERROR';
const ADDRESS_ERROR = 'ADDRESS_ERROR';
const START_DATE_ERROR = 'START_DATE_ERROR';
const END_DATE_ERROR = 'END_DATE_ERROR';

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

export function updateLimit (limit) {
  return {
    type: UPDATE_LIMIT,
    limit
  };
}

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

function submittedSuccessfully () {
  return {
    type: SUBMITTED_SUCCESSFULLY
  };
}

function submissionError (error) {
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

        // // Notify new event
        // if (Notification.permission === 'granted') {
        //   new Notification('New Event Available', {
        //     body: eventWithId.title,
        //     icon: '../../images/iconmonstr-info-6-64.png'
        //   });
        // }

        // Redirect after submitted successfully
        hashHistory.push('/');
      })
      .catch((error) => {
        dispatch(submissionError(error));
      });
  };
}

const initialState = {
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
};

// reducer
export default function eventFormReducer (state = initialState, action) {
  switch (action.type) {

    case UPDATE_TITLE:
      return {
        ...state,
        title: action.title,
        titleError: ''
      };

    case UPDATE_DESCRIPTION:
      return {
        ...state,
        description: action.description,
        descriptionError: ''
      };

    case UPDATE_ADDRESS:
      return {
        ...state,
        address: action.address,
        addressError: ''
      };

    case UPDATE_PRICE:
      return {
        ...state,
        price: action.price
      };

    case UPDATE_START_DATE:
      return {
        ...state,
        startDate: action.startDate,
        startDateError: ''
      };

    case UPDATE_END_DATE:
      return {
        ...state,
        endDate: action.endDate,
        endDateError: ''
      };

    case UPDATE_CATEGORY:
      return {
        ...state,
        category: action.category
      };

    // Form Errors
    case TITLE_ERROR:
      return {
        ...state,
        titleError: action.titleError,
      };

    case DESCRIPTION_ERROR:
      return {
        ...state,
        descriptionError: action.descriptionError,
      };

    case ADDRESS_ERROR:
      return {
        ...state,
        addressError: action.addressError,
      };

    case START_DATE_ERROR:
      return {
        ...state,
        startDateError: action.startDateError,
      };

    case END_DATE_ERROR:
      return {
        ...state,
        endDateError: action.endDateError,
      };
    
    // Successfully Submitted
    case SUBMITTED_SUCCESSFULLY:
      return {
        ...state,
        title: '',
        description: '',
        address: '',
        price: 0,
        startDate: '',
        endDate: '',
        category: '',
        error: '',
        titleError: ''
      };

    case SUBMISSION_ERROR:
      return {
        ...state,
        error: action.error
      };

    default:
      return state;
  }
}


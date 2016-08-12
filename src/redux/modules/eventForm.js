import { saveEvent } from '../../helpers/firebaseAPI';
import { hashHistory } from 'react-router';

const UPDATE_TITLE = 'UPDATE_TITLE';
const UPDATE_DESCRIPTION = 'UPDATE_DESCRIPTION';
const UPDATE_ADDRESS = 'UPDATE_ADDRESS';
const UPDATE_PRICE = 'UPDATE_PRICE';
const UPDATE_LIMIT = 'UPDATE_LIMIT';
const UPDATE_START_DATE = 'UPDATE_START_DATE';
const UPDATE_END_DATE = 'UPDATE_END_DATE';
const SUBMITTED_SUCCESSFULLY = 'SUBMITTED_SUCCESSFULLY';
const SUBMISSION_ERROR = 'SUBMISSION_ERROR';

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

export function updateStartDate(startDate) {
  return {
    type: UPDATE_START_DATE,
    startDate
  };
}

export function updateEndDate(endDate) {
  return {
    type: UPDATE_END_DATE,
    endDate
  };
}

function submittedSuccessfully () {
  return {
    type: SUBMITTED_SUCCESSFULLY
  };
}

function submissionError (error) {
  console.log('Submission Error: ', error);
  return {
    type: SUBMISSION_ERROR,
    error
  };
}

export function createEvent (event) {
  return function(dispatch) {
    saveEvent(event)
    .then((eventWithId) => {
      // console.log('EventWithID ', eventWithId);
      // TODO
      // addedEvent()
      // addedSingleusersEvent()
      dispatch(submittedSuccessfully());
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
  limit: 0,
  startDate: '',
  endDate: '',
  error: ''
};

// reducer
export default function eventFormReducer (state = initialState, action) {
  switch (action.type) {

    case UPDATE_TITLE:
      return {
        ...state,
        title: action.title
      };

    case UPDATE_DESCRIPTION:
      return {
        ...state,
        description: action.description
      };

    case UPDATE_ADDRESS:
      return {
        ...state,
        address: action.address
      };

    case UPDATE_PRICE:
      return {
        ...state,
        price: action.price
      };

    case UPDATE_LIMIT:
      return {
        ...state,
        limit: action.limit
      };

    case UPDATE_START_DATE:
      return {
        ...state,
        startDate: action.startDate
      };

    case UPDATE_END_DATE:
      return {
        ...state,
        endDate: action.endDate
      };

    case SUBMITTED_SUCCESSFULLY:
      return {
        ...state,
        title: '',
        description: '',
        address: '',
        price: 0,
        limit: 0,
        startDate: '',
        endDate: '',
        error: ''
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


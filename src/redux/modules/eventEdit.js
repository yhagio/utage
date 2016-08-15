import {
  updateEvent,
  deleteEvent
} from '../../helpers/firebaseAPI';
import { hashHistory } from 'react-router';

const EDIT_TITLE = 'EDIT_TITLE';
const EDIT_DESCRIPTION = 'EDIT_DESCRIPTION';
const EDIT_ADDRESS = 'EDIT_ADDRESS';
const EDIT_PRICE = 'EDIT_PRICE';
const EDIT_LIMIT = 'EDIT_LIMIT';
const EDIT_START_DATE = 'EDIT_START_DATE';
const EDIT_END_DATE = 'EDIT_END_DATE';
const EDIT_CATEGORY = 'EDIT_CATEGORY';
const UPDATED_SUCCESSFULLY = 'UPDATED_SUCCESSFULLY';
const UPDATE_ERROR = 'UPDATE_ERROR';

// Actions
export function updateTitle (title) {
  return {
    type: EDIT_TITLE,
    title
  };
}

export function updateDescription (description) {
  return {
    type: EDIT_DESCRIPTION,
    description
  };
}

export function updateAddress (address) {
  return {
    type: EDIT_ADDRESS,
    address
  };
}

export function updatePrice (price) {
  return {
    type: EDIT_PRICE,
    price
  };
}

export function updateLimit (limit) {
  return {
    type: EDIT_LIMIT,
    limit
  };
}

export function updateStartDate (startDate) {
  return {
    type: EDIT_START_DATE,
    startDate
  };
}

export function updateEndDate (endDate) {
  return {
    type: EDIT_END_DATE,
    endDate
  };
}

export function updateCategory (category) {
  return {
    type: EDIT_CATEGORY,
    category
  };
}

function submittedSuccessfully () {
  return {
    type: UPDATED_SUCCESSFULLY
  };
}

function submissionError (error) {
  console.log('Submission Error: ', error);
  return {
    type: UPDATE_ERROR,
    error
  };
}

export function handleUpdateEvent (eventId, event) {
  return function (dispatch) {
    updateEvent(eventId, event)
      .then((eventWithId) => {
      // console.log('UPDATED', eventWithId)
        dispatch(submittedSuccessfully());
      // Redirect after submitted successfully
        hashHistory.push(`/events/${eventWithId.eventId}`);
      })
      .catch((error) => {
      // console.log('UPDATED E', error)
        dispatch(submissionError(error));
      });
  };
}

export function handleDeleteEvent (eventId, event) {
  return function (dispatch) {
    deleteEvent(eventId, event)
      .then((path) => {
      // console.log('Deleted', path)
        dispatch(submittedSuccessfully());
      // Redirect after submitted successfully
        hashHistory.push(path);
      })
      .catch((error) => {
      // console.log('Deleted E', error)
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
  category: 'Social',
  error: ''
};

// reducer
export default function eventEditReducer (state = initialState, action) {
  switch (action.type) {

    case EDIT_TITLE:
      return {
        ...state,
        title: action.title
      };

    case EDIT_DESCRIPTION:
      return {
        ...state,
        description: action.description
      };

    case EDIT_ADDRESS:
      return {
        ...state,
        address: action.address
      };

    case EDIT_PRICE:
      return {
        ...state,
        price: action.price
      };

    case EDIT_LIMIT:
      return {
        ...state,
        limit: action.limit
      };

    case EDIT_START_DATE:
      return {
        ...state,
        startDate: action.startDate
      };

    case EDIT_END_DATE:
      return {
        ...state,
        endDate: action.endDate
      };

    case EDIT_CATEGORY:
      return {
        ...state,
        category: action.category
      };

    case UPDATED_SUCCESSFULLY:
      return {
        ...state,
        title: '',
        description: '',
        address: '',
        price: 0,
        startDate: '',
        endDate: '',
        category: '',
        error: ''
      };

    case UPDATE_ERROR:
      return {
        ...state,
        error: action.error
      };

    default:
      return state;
  }
}


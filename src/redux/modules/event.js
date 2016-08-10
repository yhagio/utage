const FETCHING_EVENT = 'FETCHING_EVENT ';
const FETCHING_EVENT_ERROR = 'FETCHING_EVENT_ERROR';
const FETCHING_EVENT_SUCCESS = 'FETCHING_EVENT_SUCCESS';
const UPDATE_ATTENDANCE = 'UPDATE_ATTENDANCE';

function fetchingEvent () {
  return {
    type: FETCHING_EVENT
  };
}

function fetchingEventError (error) {
  return {
    type: FETCHING_EVENT_ERROR,
    error
  };
}

function fetchingEventSuccess (event) {
  return {
    type: FETCHING_EVENT_SUCCESS,
    event
  };
}

function updateAttendance (going) {
  return {
    type: FETCHING_EVENT_SUCCESS,
    going
  };
}

const initialState = {
  event: {},
  isFetching: false,
  error: '',
  rsvp: false,
  going: false,
  comments: [],
}; 



export default function event (state = initialState, action) {
  switch (action.type) {

    case FETCHING_EVENT :
      return {
        ...state,
        isFetching: true
      };

    case FETCHING_EVENT_ERROR :
      return {
        ...state,
        isFetching: false,
        error: action.error
      };

    case FETCHING_EVENT_SUCCESS :
      return {
        ...state,
        isFetching: false,
        error: '',
        event: action.event
      };

    case UPDATE_ATTENDANCE :
      return {
        ...state,
        rsvp: true,
        going: action.going
      };

    default :
      return state;
  }
}
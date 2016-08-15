import { fetchAttendance } from '../../helpers/firebaseAPI';
import {
  CONFIRM_GOING,
  IM_NOT_GOING
} from './usersAttendance';

const FETCHING_ATTENDANCE = 'FETCHING_ATTENDANCE';
const FETCHING_ATTENDANCE_SUCCESS = 'FETCHING_ATTENDANCE_SUCCESS';
const FETCHING_ATTENDANCE_ERROR = 'FETCHING_ATTENDANCE_ERROR';

function fetchingAttendance () {
  return {
    type: FETCHING_ATTENDANCE
  };
}

function fetchingAttendanceSuccess (eventId, count) {
  return {
    type: FETCHING_ATTENDANCE_SUCCESS,
    eventId,
    count
  };
}

function fetchingAttendanceError (error) {
  console.error('fetchingAttendanceError', error);
  return {
    type: FETCHING_ATTENDANCE_ERROR,
    error: 'Fetching attendance error'
  };
}

export function fetchEventAttendance (eventId) {
  return function (dispatch) {
    dispatch(fetchingAttendance());

    fetchAttendance(eventId)
      .then((count) => {
        return dispatch(fetchingAttendanceSuccess(eventId, count));
      })
      .catch((error) => {
        return dispatch(fetchingAttendanceError(error));
      });
  };
}

const initialState = {
  isFetching: false,
  error: ''
};

export default function eventAttendance (state = initialState, action) {
  switch (action.type) {

    case FETCHING_ATTENDANCE :
      return {
        ...state,
        isFetching: true
      };

    case FETCHING_ATTENDANCE_SUCCESS :
      return {
        ...state,
        ...initialState,
        [action.eventId]: action.count
      };

    case FETCHING_ATTENDANCE_ERROR :
      return {
        ...state,
        isFetching: false,
        error: action.error
      };

    case CONFIRM_GOING :
      return typeof state[action.eventId] === 'undefined'
        ? state
        : {
          ...state,
          [action.eventId]: state[action.eventId] + 1
        };

    case IM_NOT_GOING :
      return typeof state[action.eventId] === 'undefined'
        ? state
        : {
          ...state,
          [action.eventId]: state[action.eventId] - 1
        };

    default :
      return state;
  }
}

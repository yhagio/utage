import { Map } from 'immutable';
import { fetchAttendance } from '../../helpers/firebaseAPI';
import {
  CONFIRM_GOING,
  IM_NOT_GOING
} from './usersAttendance';

export const FETCHING_ATTENDANCE = 'FETCHING_ATTENDANCE';
export const FETCHING_ATTENDANCE_SUCCESS = 'FETCHING_ATTENDANCE_SUCCESS';
export const FETCHING_ATTENDANCE_ERROR = 'FETCHING_ATTENDANCE_ERROR';

export function fetchingAttendance () {
  return {
    type: FETCHING_ATTENDANCE
  };
}

export function fetchingAttendanceSuccess (eventId, count) {
  return {
    type: FETCHING_ATTENDANCE_SUCCESS,
    eventId,
    count
  };
}

export function fetchingAttendanceError (error) {
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

const initialState = Map({
  isFetching: false,
  error: ''
});

export default function eventAttendance (state = initialState, action) {
  switch (action.type) {

    case FETCHING_ATTENDANCE :
      return state.merge({ 
        isFetching: true
      });

    case FETCHING_ATTENDANCE_SUCCESS :
      return state.merge({ 
        isFetching: false,
        error: '',
        [action.eventId]: action.count
      });

    case FETCHING_ATTENDANCE_ERROR :
      return state.merge({ 
        isFetching: false,
        error: action.error
      });

    case CONFIRM_GOING :
      return typeof state.get(action.eventId) === 'undefined'
        ? state
        : state.merge({
          [action.eventId]: state.get(action.eventId) + 1
        });

    case IM_NOT_GOING :
      return typeof state.get(action.eventId) === 'undefined'
        ? state
        : state.merge({
          [action.eventId]: state.get(action.eventId) - 1
        });

    default :
      return state;
  }
}

import { fromJS } from 'immutable';
import { fetchEvents } from '../../helpers/firebaseAPI';

export const FETCHING_EVENTS = 'FETCHING_EVENTS';
export const FETCHING_EVENTS_ERROR = 'FETCHING_EVENTS_ERROR';
export const FETCHING_EVENTS_SUCCESS = 'FETCHING_EVENTS_SUCCESS';
export const FILTER_EVENTS_CATEGORY = 'FILTER_EVENTS_CATEGORY';

export function fetchingEvents () {
  return {
    type: FETCHING_EVENTS
  };
}

export function fetchingEventsError (error) {
  console.error('fetchingEventsError', error);
  return {
    type: FETCHING_EVENTS_ERROR,
    error: 'Could not get events list ...'
  };
}

export function fetchingEventsSuccess (events, filteredEvents) {
  return {
    type: FETCHING_EVENTS_SUCCESS,
    events,
    filteredEvents
  };
}

export function filterEventsByCategory (category) {
  return {
    type: FILTER_EVENTS_CATEGORY,
    category
  };
}

export function fetchAndHandleEvents () {
  return function (dispatch) {
    dispatch(fetchingEvents());
    fetchEvents(({ sortedEvents, sortedIds }) => {
      return dispatch(fetchingEventsSuccess(sortedEvents, sortedIds));
    }, (error) => {
      // console.log('error', error);
      return dispatch(fetchingEventsError(error));
    });
  };
}

export function getFilteredEventIDs (baseEvents, category) {
  if (category !== '') {
    return baseEvents
      .sort((a, b) => {
        // DESC order by timestamp
        return b.get('timestamp') - a.get('timestamp');
      })
      .filter((event) => {
        // See if event's category matches with selected category to filter
        return event.get('category') === category;
      });
  } else {
    // Just return timely ordered IDs
    return baseEvents.sort((a, b) => {
      // DESC order by timestamp
      return b.get('timestamp') - a.get('timestamp');
    });
  }
}

const initialState = fromJS({
  events: {},
  error: '',
  isFetching: false,
  category: '',
  filteredEvents: {}
});

export default function events (state = initialState, action) {
  switch (action.type) {

    case FETCHING_EVENTS :
      return state.merge({
        isFetching: true
      });

    case FETCHING_EVENTS_ERROR :
      return state.merge({
        isFetching: false,
        error: action.error
      });

    case FETCHING_EVENTS_SUCCESS :
      return state.merge({
        isFetching: false,
        error: '',
        events: action.events,
        filteredEvents: action.events
      });

    case FILTER_EVENTS_CATEGORY :
      return state.merge({
        category: action.category,
        filteredEvents: getFilteredEventIDs(state.get('events'), action.category)
      });

    default :
      return state;
  }
}

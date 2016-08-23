import { fromJS } from 'immutable';
import { fetchEvents } from '../../helpers/firebaseAPI';

const FETCHING_EVENTS = 'FETCHING_EVENTS';
const FETCHING_EVENTS_ERROR = 'FETCHING_EVENTS_ERROR';
const FETCHING_EVENTS_SUCCESS = 'FETCHING_EVENTS_SUCCESS';
const FILTER_EVENTS_CATEGORY = 'FILTER_EVENTS_CATEGORY';

function fetchingEvents () {
  return {
    type: FETCHING_EVENTS
  };
}

function fetchingEventsError (error) {
  console.error('fetchingEventsError', error);
  return {
    type: FETCHING_EVENTS_ERROR,
    error: 'Could not get events list ...'
  };
}

function fetchingEventsSuccess (events, filteredEvents) {
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
    fetchEvents(({ events, sorted }) => {
      // console.log('sorted', sorted);
      return dispatch(fetchingEventsSuccess(events, sorted));
    }, (error) => {
      // console.log('error', error);
      return dispatch(fetchingEventsError(error));
    });
  };
}

function getFilteredEventIDs (baseEvents, category) {
  
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
  // if (category !== '') {
  //   return Object.keys(baseEvents)
  //     .sort((a, b) => {
  //       // DESC order by timestamp
  //       return baseEvents[b].timestamp - baseEvents[a].timestamp;
  //     })
  //     .filter((event) => {
  //       // See if event's category matches with selected category to filter
  //       return (baseEvents[event].category.toLowerCase().indexOf(category.toLowerCase()) >= 0);
  //     });
  // } else {
  //   // Just return timely ordered IDs
  //   return Object.keys(baseEvents).sort((a, b) => {
  //     // DESC order by timestamp
  //     return baseEvents[b].timestamp - baseEvents[a].timestamp;
  //   });
  // }
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
        searchText: '',
        filteredEvents: getFilteredEventIDs(state.get('events'), action.category)
      });

    default :
      return state;
  }
}

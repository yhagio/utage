import { fetchEvents } from '../../helpers/firebaseAPI';

const FETCHING_EVENTS = 'FETCHING_EVENTS';
const FETCHING_EVENTS_ERROR = 'FETCHING_EVENTS_ERROR';
const FETCHING_EVENTS_SUCCESS = 'FETCHING_EVENTS_SUCCESS';
const SEARCH_EVENTS = 'SEARCH_EVENTS';
const FILTER_EVENTS_CATEGORY = 'FILTER_EVENTS_CATEGORY';

function fetchingEvents () {
  return {
    type: FETCHING_EVENTS
  };
}

function fetchingEventsError (error) {
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

export function fetchAndHandleEvents() {
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
    return Object.keys(baseEvents)
      .sort((a, b) => { 
        // DESC order by timestamp
        return baseEvents[b].timestamp - baseEvents[a].timestamp;
      })
      .filter((event) => { 
        // See if event's category matches with selected category to filter
        return (baseEvents[event].category.toLowerCase().indexOf(category.toLowerCase()) >= 0);
      });
  } else {
    // Just return timely ordered IDs
    return Object.keys(baseEvents).sort((a, b) => { 
      // DESC order by timestamp
      return baseEvents[b].timestamp - baseEvents[a].timestamp;
    });
  }
}

const initialState = {
  events: {},
  error: '',
  isFetching: false,
  category: '',
  filteredEvents: []
};

export default function events (state = initialState, action) {
  switch (action.type) {

    case FETCHING_EVENTS :
      return {
        ...state,
        isFetching: true
      };

    case FETCHING_EVENTS_ERROR :
      return {
        ...state,
        isFetching: false,
        error: action.error
      };

    case FETCHING_EVENTS_SUCCESS :
      return {
        ...state,
        isFetching: false,
        error: '',
        events: action.events,
        filteredEvents: action.filteredEvents
      };

    case FILTER_EVENTS_CATEGORY :
      return {
        ...state,
        category: action.category,
        searchText: '',
        filteredEvents: getFilteredEventIDs(state.events, action.category)
      };

    default :
      return state;
  }
}
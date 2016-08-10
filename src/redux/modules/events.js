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
    error
  };
}

function fetchingEventsSuccess (events) {
  return {
    type: FETCHING_EVENTS_SUCCESS,
    events
  };
}

export function searchEvents (searchText) {
  return {
    type: SEARCH_EVENTS,
    searchText
  };
}

export function filterEventsByCategory (searchCategory) {
  return {
    type: FILTER_EVENTS_CATEGORY,
    searchCategory
  };
}

const initialState = {
  events: [],
  error: '',
  isFetching: false,
  searchText: '',
  searchCategory: 'default',
  filteredRes: []
};

function getFilteredEvents (baseEvents, searchTerm, searchCategory) {
  // TODO
}

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
        filteredRes: action.events
      };

    case SEARCH_EVENTS :
      return {
        ...state,
        searchText: action.searchText,
        searchCategory: 'default',
        filteredRes: getFilteredEvents(state.events, action.searchText, null)
      };

    case FILTER_EVENTS_CATEGORY :
      return {
        ...state,
        searchCategory: action.searchCategory,
        searchText: '',
        filteredRes: getFilteredEvents(state.events, null, action.searchCategory)
      };

    default :
      return state;
  }
}
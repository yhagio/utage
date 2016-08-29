import { fromJS } from 'immutable';
import {
  fetchSingleEvent,
  fetchSingleUser
} from '../../helpers/firebaseAPI';
import {
  getDistanceFromLatLonInKm
} from '../../helpers/utils';

export const FETCHING_EVENT = 'FETCHING_EVENT';
export const FETCHING_EVENT_ERROR = 'FETCHING_EVENT_ERROR';
export const FETCHING_EVENT_SUCCESS = 'FETCHING_EVENT_SUCCESS';

export const FETCHING_HOST = 'FETCHING_HOST';
export const FETCHING_HOST_SUCCESS = 'FETCHING_HOST_SUCCESS';
export const FETCHING_HOST_ERROR = 'FETCHING_HOST_ERROR';

export const CONVERTING_ADDRESS_TO_LATLNG = 'CONVERTING_ADDRESS_TO_LATLNG';
export const CONVERTED_ADDRESS_TO_LATLNG = 'CONVERTED_ADDRESS_TO_LATLNG';
export const CONVERTING_ADDRESS_TO_LATLNG_ERROR = 'CONVERTING_ADDRESS_TO_LATLNG_ERROR';

export const CALCULATING_DISTANCE = 'CALCULATING_DISTANCE';
export const CALCULATED_DISTANCE = 'CALCULATED_DISTANCE';
export const FAILED_CALCULATE_DISTANCE = 'FAILED_CALCULATE_DISTANCE';

export function fetchingEvent () {
  return {
    type: FETCHING_EVENT
  };
}

export function fetchingEventError (error) {
  console.warn(error);
  return {
    type: FETCHING_EVENT_ERROR,
    error: 'Could not load event ...'
  };
}

export function fetchingEventSuccess (event) {
  return {
    type: FETCHING_EVENT_SUCCESS,
    event
  };
}

export function fetchingHost () {
  return {
    type: FETCHING_HOST
  };
}

export function fetchingHostError (error) {
  console.error('fetchingHostError', error);
  return {
    type: FETCHING_HOST_ERROR,
    error: 'Could not fetch event host info'
  };
}

export function fetchingHostSuccess (eventHost) {
  return {
    type: FETCHING_HOST_SUCCESS,
    eventHost
  };
}

export function convertingAddressToLatlng () {
  return {
    type: CONVERTING_ADDRESS_TO_LATLNG
  };
}

export function convertedAddressToLatlng (eventLatLng) {
  return {
    type: CONVERTED_ADDRESS_TO_LATLNG,
    eventLatLng
  };
}

export function convertingAddressToLatlngError (error) {
  console.error('convertingAddressToLatlngError', error);
  return {
    type: CONVERTING_ADDRESS_TO_LATLNG_ERROR,
    error: 'Could not convert address to lat lng'
  };
}

export function calculatingDistance () {
  return {
    type: CALCULATING_DISTANCE
  };
}

export function calculatedDistance (distance) {
  return {
    type: CALCULATED_DISTANCE,
    distance
  };
}

export function failedToGetDistance () {
  return {
    type: FAILED_CALCULATE_DISTANCE,
    error: 'Could not get the distance'
  };
}

// Get single user info (HOST of the event)
export function fetchAndHandleHost (uid, dispatch) {
  dispatch(fetchingHost());
  fetchSingleUser(uid)
    .then((user) => dispatch(fetchingHostSuccess(user)))
    .catch((err) => dispatch(fetchingHostError(err)));
}

// Convert Address to Lat Lng for Google Map Marker position
export function convertFromAddressToLatlng (address, dispatch) {
  const geocoder = new google.maps.Geocoder();
  dispatch(convertingAddressToLatlng());
  return new Promise(function (resolve, reject) {
    geocoder.geocode({ 'address': address }, function (result, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        // resolve result upon a successful status
        resolve({
          lat: result[0].geometry.location.lat(),
          lng: result[0].geometry.location.lng()
        });
      } else {
        // reject status upon un-successful status
        reject(status);
      }
    });
  })
    .then((result) => {
    // console.log('convertFromAddressToLatlng result', result);
      dispatch(convertedAddressToLatlng(result));
    })
    .catch((error) => {
    // console.log('convertFromAddressToLatlng err', error);
      dispatch(convertingAddressToLatlngError(error));
    });
}

// Get the event and the host
export function fetchAndHandleEvent (eventId) {
  return function (dispatch) {
    dispatch(fetchingEvent());
    fetchSingleEvent(eventId)
      .then((event) => {
        // Convert Address to Lat Lng
        convertFromAddressToLatlng(event.address, dispatch);
        return dispatch(fetchingEventSuccess(event));
      })
      .then((event) => {
        // Get the event host
        return fetchAndHandleHost(event.event.uid, dispatch);
      })
      .catch((error) => {
        // console.log('Error: ', error);
        return dispatch(fetchingEventError(error));
      });
  };
}

export function calculateDistance (lat1, lon1, lat2, lon2) {
  // console.log('Calculating')
  return function (dispatch) {
    dispatch(calculatingDistance());
    let distance = getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2);
    if (distance > 0) {
      return dispatch(calculatedDistance(distance));
    } else {
      return dispatch(failedToGetDistance());
    }
  };
}

const initialState = fromJS({
  event: {},
  eventHost: {},
  eventLatLng: {},
  isFetching: false,
  error: '',
  rsvp: false,
  going: false,
  comments: [],
  distanceCalculating: false,
  distance: 0
});

export default function event (state = initialState, action) {
  switch (action.type) {

    case FETCHING_EVENT :
      return state.merge({
        isFetching: true,
        distanceCalculating: true // UI Hack: Enables calculating distance starts
      });

    case FETCHING_EVENT_ERROR :
      return state.merge({
        isFetching: false,
        error: action.error
      });

    case FETCHING_EVENT_SUCCESS :
      return state.merge({
        isFetching: false,
        error: '',
        event: action.event
      });

    case FETCHING_HOST :
      return state.merge({
        isFetching: true
      });

    case FETCHING_HOST_SUCCESS :
      return state.merge({
        isFetching: false,
        error: '',
        eventHost: action.eventHost
      });

    case FETCHING_HOST_ERROR :
      return state.merge({
        isFetching: false,
        error: action.error
      });

    case CONVERTING_ADDRESS_TO_LATLNG :
      return state.merge({
        isFetching: true,
        eventLatLng: {}
      });

    case CONVERTED_ADDRESS_TO_LATLNG :
      return state.merge({
        isFetching: false,
        error: '',
        eventLatLng: action.eventLatLng
      });

    case CONVERTING_ADDRESS_TO_LATLNG_ERROR :
      return state.merge({
        isFetching: false,
        error: action.error,
        eventLatLng: {lat: 45.5298537, lng: -73.5944413}
      });

    case CALCULATING_DISTANCE :
      return state.merge({
        distanceCalculating: true,
        distance: 0
      });

    case CALCULATED_DISTANCE :
      return state.merge({
        distanceCalculating: false,
        distance: action.distance
      });

    case FAILED_CALCULATE_DISTANCE :
      return state.merge({
        distanceCalculating: false,
        error: action.error,
        distance: 0
      });

    default :
      return state;
  }
}

import { Map, fromJS } from 'immutable';
import { expect } from 'chai';
import { spy } from 'sinon';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as eventRedux from '../../src/redux/modules/event';
// import { ref } from '../../src/config/constants';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

describe('[Redux] - Event: actions', () => {
  it('should create an action when fetching an event', () => {
    const expectedAction = {
      type: eventRedux.FETCHING_EVENT
    };
    expect(eventRedux.fetchingEvent()).to.deep.equal(expectedAction);
  });

  it('should create an action when failed to fetch an event', () => {
    const err = 'some error message';
    const expectedAction = {
      type: eventRedux.FETCHING_EVENT_ERROR,
      error: 'Could not load event ...'
    };
    expect(eventRedux.fetchingEventError(err)).to.deep.equal(expectedAction);
  });

  it('should create an action when fetched an event successfully', () => {
    const event = Map({
      eventId: '123abc',
      title: 'wowow',
      description: 'oh yeah'
    });
    const expectedAction = {
      type: eventRedux.FETCHING_EVENT_SUCCESS,
      event
    };
    expect(eventRedux.fetchingEventSuccess(event)).to.deep.equal(expectedAction);
  });

  it('should create an action when fetching the host', () => {
    const expectedAction = {
      type: eventRedux.FETCHING_HOST
    };
    expect(eventRedux.fetchingHost()).to.deep.equal(expectedAction);
  });

  it('should create an action when failed to fetch the host', () => {
    const err = 'some error message';
    const expectedAction = {
      type: eventRedux.FETCHING_HOST_ERROR,
      error: 'Could not fetch event host info'
    };
    expect(eventRedux.fetchingHostError(err)).to.deep.equal(expectedAction);
  });

  it('should create an action when fetched the host successfully', () => {
    const eventHost = Map({
      uid: '123abc',
      name: 'wowow',
      photoURL: 'http://www.3243243242342.co.jp'
    });
    const expectedAction = {
      type: eventRedux.FETCHING_HOST_SUCCESS,
      eventHost
    };
    expect(eventRedux.fetchingHostSuccess(eventHost)).to.deep.equal(expectedAction);
  });

  it('should create an action when converting the address to lat lng', () => {
    const expectedAction = {
      type: eventRedux.CONVERTING_ADDRESS_TO_LATLNG
    };
    expect(eventRedux.convertingAddressToLatlng()).to.deep.equal(expectedAction);
  });

  it('should create an action when converted the address to lat lng successfully', () => {
    const eventLatLng = Map({
      lat: '1231434233',
      lng: '-234324234'
    });
    const expectedAction = {
      type: eventRedux.CONVERTED_ADDRESS_TO_LATLNG,
      eventLatLng
    };
    expect(eventRedux.convertedAddressToLatlng(eventLatLng)).to.deep.equal(expectedAction);
  });

  it('should create an action when failed to convert the address to lat lng', () => {
    const err = 'some error message';
    const expectedAction = {
      type: eventRedux.CONVERTING_ADDRESS_TO_LATLNG_ERROR,
      error: 'Could not convert address to lat lng'
    };
    expect(eventRedux.convertingAddressToLatlngError(err)).to.deep.equal(expectedAction);
  });

  it('should create an action when calculating the distance from current place to the venue', () => {
    const expectedAction = {
      type: eventRedux.CALCULATING_DISTANCE
    };
    expect(eventRedux.calculatingDistance()).to.deep.equal(expectedAction);
  });

  it('should create an action when calculated the distance successfully', () => {
    const distance = 123232;
    const expectedAction = {
      type: eventRedux.CALCULATED_DISTANCE,
      distance
    };
    expect(eventRedux.calculatedDistance(distance)).to.deep.equal(expectedAction);
  });

  it('should create an action when failed to calculate the distance', () => {
    const expectedAction = {
      type: eventRedux.FAILED_CALCULATE_DISTANCE,
      error: 'Could not get the distance'
    };
    expect(eventRedux.failedToGetDistance()).to.deep.equal(expectedAction);
  });
});

describe.skip('[Redux] - Event: action creators (fetchAndHandleEvent)', () => {
  const middlewares = [ thunk ];
  const mockStore = configureMockStore(middlewares);
  afterEach(() => {
    nock.cleanAll()
  });

  it('creates FETCHING_EVENT_SUCCESS when fetched the event successfully', () => {
    const eventHost = Map({
      uid: '123abc',
      name: 'wowow',
      photoURL: 'http://www.3243243242342.co.jp'
    });

    const event = Map({
      eventId: '1ac',
      title: 'sample title',
      description: 'hoo lay'
    });

    nock('https://utage-7e146.firebaseio.com/')
      .get('/events/1ac')
      .reply(200, {
        eventId: '1ac',
        title: 'sample title',
        description: 'hoo lay'
      })

    const expectedActions = [
      { type: eventRedux.FETCHING_EVENT },
      { type: eventRedux.FETCHING_EVENT_SUCCESS, event: event }
    ];

    const expectedActions2 = [
      { type: eventRedux.FETCHING_EVENT },
      { type: eventRedux.FETCHING_EVENT_ERROR, error: 'Could not load event ...' }
    ];
    const store = mockStore({ });

    return store.dispatch(eventRedux.fetchAndHandleEvent('1ac'))
      .then(() => {
        expect(store.getActions()).to.deep.equal(expectedActions)
      })
      .catch(() => {
        expect(store.getActions()).to.deep.equal(expectedActions2)
      })
  });
});

describe.skip('[Redux] - Event: action creators (calculateDistance)', () => {
  it('creates CALCULATED_DISTANCE when calculated the distance successfully');
});

describe('[Redux] - Event: reducers', () => {
  it('should return the initial state', () => {
    expect(
      eventRedux.default(undefined, {})
    ).to.deep.equal(
      fromJS({
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
      })
    );
  });

  it('should handle FETCHING_EVENT', () => {
    expect(
      eventRedux.default(undefined, {
        type: eventRedux.FETCHING_EVENT,
      })
    ).to.deep.equal(
      fromJS({
        event: {},
        eventHost: {},
        eventLatLng: {},
        isFetching: true,
        error: '',
        rsvp: false,
        going: false,
        comments: [],
        distanceCalculating: true,
        distance: 0
      })
    );
  });

  it('should handle FETCHING_EVENT_ERROR', () => {
    expect(
      eventRedux.default(undefined, {
        type: eventRedux.FETCHING_EVENT_ERROR,
        error: 'Could not load event ...'
      })
    ).to.deep.equal(
      fromJS({
        event: {},
        eventHost: {},
        eventLatLng: {},
        isFetching: false,
        error: 'Could not load event ...',
        rsvp: false,
        going: false,
        comments: [],
        distanceCalculating: false,
        distance: 0
      })
    );
  });

  it('should handle FETCHING_EVENT_SUCCESS', () => {
    const event = Map({
      eventId: '1ac',
      title: 'sample title',
      description: 'hoo lay'
    });

    expect(
      eventRedux.default(undefined, {
        type: eventRedux.FETCHING_EVENT_SUCCESS,
        event
      })
    ).to.deep.equal(
      fromJS({
        event,
        eventHost: {},
        eventLatLng: {},
        isFetching: false,
        error: '',
        rsvp: false,
        going: false,
        comments: [],
        distanceCalculating: false,
        distance: 0
      })
    );
  });

  it('should handle FETCHING_HOST', () => {
    expect(
      eventRedux.default(undefined, {
        type: eventRedux.FETCHING_HOST,
      })
    ).to.deep.equal(
      fromJS({
        event: {},
        eventHost: {},
        eventLatLng: {},
        isFetching: true,
        error: '',
        rsvp: false,
        going: false,
        comments: [],
        distanceCalculating: false,
        distance: 0
      })
    );
  });

  it('should handle FETCHING_HOST_SUCCESS', () => {
    const eventHost = Map({
      uid: '1ac',
      name: 'Alice',
      photoURL: 'http://www.sdfdsfsdfsdf.co'
    });

    expect(
      eventRedux.default(undefined, {
        type: eventRedux.FETCHING_HOST_SUCCESS,
        eventHost
      })
    ).to.deep.equal(
      fromJS({
        event: {},
        eventHost,
        eventLatLng: {},
        isFetching: false,
        error: '',
        rsvp: false,
        going: false,
        comments: [],
        distanceCalculating: false,
        distance: 0
      })
    );
  });

  it('should handle FETCHING_HOST_ERROR', () => {
    expect(
      eventRedux.default(undefined, {
        type: eventRedux.FETCHING_HOST_ERROR,
        error: 'Could not fetch event host info'
      })
    ).to.deep.equal(
      fromJS({
        event: {},
        eventHost: {},
        eventLatLng: {},
        isFetching: false,
        error: 'Could not fetch event host info',
        rsvp: false,
        going: false,
        comments: [],
        distanceCalculating: false,
        distance: 0
      })
    );
  });  

  it('should handle CONVERTING_ADDRESS_TO_LATLNG', () => {
    expect(
      eventRedux.default(undefined, {
        type: eventRedux.CONVERTING_ADDRESS_TO_LATLNG,
      })
    ).to.deep.equal(
      fromJS({
        event: {},
        eventHost: {},
        eventLatLng: {},
        isFetching: true,
        error: '',
        rsvp: false,
        going: false,
        comments: [],
        distanceCalculating: false,
        distance: 0
      })
    );
  });

  it('should handle CONVERTED_ADDRESS_TO_LATLNG', () => {
    expect(
      eventRedux.default(undefined, {
        type: eventRedux.CONVERTED_ADDRESS_TO_LATLNG,
        eventLatLng: { lat: 1231232, lng: -4254 }
      })
    ).to.deep.equal(
      fromJS({
        event: {},
        eventHost: {},
        eventLatLng: { lat: 1231232, lng: -4254 },
        isFetching: false,
        error: '',
        rsvp: false,
        going: false,
        comments: [],
        distanceCalculating: false,
        distance: 0
      })
    );
  });

  it('should handle CONVERTING_ADDRESS_TO_LATLNG_ERROR', () => {
    expect(
      eventRedux.default(undefined, {
        type: eventRedux.CONVERTING_ADDRESS_TO_LATLNG_ERROR,
        error: 'Could not convert address to lat lng'
      })
    ).to.deep.equal(
      fromJS({
        event: {},
        eventHost: {},
        eventLatLng: {lat: 45.5298537, lng: -73.5944413},
        isFetching: false,
        error: 'Could not convert address to lat lng',
        rsvp: false,
        going: false,
        comments: [],
        distanceCalculating: false,
        distance: 0
      })
    );
  });

  it('should handle CALCULATING_DISTANCE', () => {
    expect(
      eventRedux.default(undefined, {
        type: eventRedux.CALCULATING_DISTANCE,
      })
    ).to.deep.equal(
      fromJS({
        event: {},
        eventHost: {},
        eventLatLng: {},
        isFetching: false,
        error: '',
        rsvp: false,
        going: false,
        comments: [],
        distanceCalculating: true,
        distance: 0
      })
    );
  });

  it('should handle CALCULATED_DISTANCE', () => {
    expect(
      eventRedux.default(undefined, {
        type: eventRedux.CALCULATED_DISTANCE,
        distance: 909
      })
    ).to.deep.equal(
      fromJS({
        event: {},
        eventHost: {},
        eventLatLng: {},
        isFetching: false,
        error: '',
        rsvp: false,
        going: false,
        comments: [],
        distanceCalculating: false,
        distance: 909
      })
    );
  });

  it('should handle FAILED_CALCULATE_DISTANCE', () => {
    expect(
      eventRedux.default(undefined, {
        type: eventRedux.FAILED_CALCULATE_DISTANCE,
        error: 'Could not get the distance'
      })
    ).to.deep.equal(
      fromJS({
        event: {},
        eventHost: {},
        eventLatLng: {},
        isFetching: false,
        error: 'Could not get the distance',
        rsvp: false,
        going: false,
        comments: [],
        distanceCalculating: false,
        distance: 0
      })
    );
  });
});
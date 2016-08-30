import { Map, fromJS } from 'immutable';
import { expect } from 'chai';
import { spy } from 'sinon';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as eventsRedux from '../../src/redux/modules/events';

describe('[Redux] - Events: actions', () => {
  it('should create an action when fetching the events', () => {
    const expectedAction = {
      type: eventsRedux.FETCHING_EVENTS
    };
    expect(eventsRedux.fetchingEvents()).to.deep.equal(expectedAction);
  });

  it('should create an action when fetched the events successfully', () => {
    const events = Map({
      eventId: 'weoe23',
      title: 'Original',
      description: 'Cool description'
    });

    const filteredEvents = Map({
      eventId: 'weoe23',
      title: 'Original',
      description: 'Cool description'
    });

    const expectedAction = {
      type: eventsRedux.FETCHING_EVENTS_SUCCESS,
      events,
      filteredEvents
    };
    expect(eventsRedux.fetchingEventsSuccess(events, filteredEvents)).to.deep.equal(expectedAction);
  });

  it('should create an action when failed to fetch the events', () => {
    const error = 'Could not get events list ...';
    const expectedAction = {
      type: eventsRedux.FETCHING_EVENTS_ERROR,
      error
    };
    expect(eventsRedux.fetchingEventsError(error)).to.deep.equal(expectedAction);
  });
  
  it('should create an action when filtering the events by the category', () => {
    const category = 'Social';
    const expectedAction = {
      type: eventsRedux.FILTER_EVENTS_CATEGORY,
      category
    };
    expect(eventsRedux.filterEventsByCategory(category)).to.deep.equal(expectedAction);
  });
});

describe.skip('[Redux] - Events: action creators', () => {
  it('creates FETCHING_EVENTS_SUCCESS when fetchAndHandleEvents() went successfully');
  it('creates FETCHING_EVENTS_ERROR when failed fetchAndHandleEvents() ');
  it('getFilteredEventIDs() returns the filtered events if the category is passed');
  it('getFilteredEventIDs() returns the base events if no category is passed');
});

describe('[Redux] - Events: reducers', () => {
  it('should return the initial state', () => {
    expect(
      eventsRedux.default(undefined, {})
    ).to.deep.equal(
      fromJS({
        events: {},
        error: '',
        isFetching: false,
        category: '',
        filteredEvents: {}
      })
    );
  });

  it('should handle FETCHING_EVENTS', () => {
    expect(
      eventsRedux.default(undefined, {
        type: eventsRedux.FETCHING_EVENTS
      })
    ).to.deep.equal(
      fromJS({
        events: {},
        error: '',
        isFetching: true,
        category: '',
        filteredEvents: {}
      })
    );
  });

  it('should handle FETCHING_EVENTS_ERROR', () => {
    const error = 'Could not get events list ...';
    expect(
      eventsRedux.default(undefined, {
        type: eventsRedux.FETCHING_EVENTS_ERROR,
        error
      })
    ).to.deep.equal(
      fromJS({
        events: {},
        error,
        isFetching: false,
        category: '',
        filteredEvents: {}
      })
    );
  });

  it('should handle FETCHING_EVENTS_SUCCESS', () => {
    const events = Map({ eventId: '123', title: 'Hola' });
    const filteredEvents = Map({ eventId: '123', title: 'Hola' });

    expect(
      eventsRedux.default(undefined, {
        type: eventsRedux.FETCHING_EVENTS_SUCCESS,
        events,
        filteredEvents
      })
    ).to.deep.equal(
      fromJS({
        events,
        error: '',
        isFetching: false,
        category: '',
        filteredEvents
      })
    );
  });

  it('should handle FILTER_EVENTS_CATEGORY', () => {
    let state = fromJS({
      events: {},
      error: '',
      isFetching: false,
      category: '',
      filteredEvents: {}
    });

    const events = {
      "-KPExnVauc3rVi-I5jJJ" : {
        "category" : "Birthday",
        "eventId" : "-KPExnVauc3rVi-I5jJJ",
        "timestamp" : 1471294158896,
      },
      "-KPEyPnNKTqz8DI72jvy" : {
        "category" : "Birthday",
        "eventId" : "-KPEyPnNKTqz8DI72jvy",
        "timestamp" : 1471294319842,
        "title" : "Eat Cheesecakes + Code!"
      }
    };

    state.merge({
      isFetching: false,
      error: '',
      events: events,
      filteredEvents: events
    });

    expect(
      eventsRedux.default(state, {
        type: eventsRedux.FILTER_EVENTS_CATEGORY,
        category: 'Birthday'
      })
    ).to.deep.equal(
      state.merge({
        category: 'Birthday',
        filteredEvents: eventsRedux.getFilteredEventIDs(state.get('events'), 'Birthday')
      })
    );
  });
});
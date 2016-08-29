import { Map } from 'immutable';
import { expect } from 'chai';
import { spy } from 'sinon';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as eaRedux from '../../src/redux/modules/eventAttendance';
import * as uaRedux from '../../src/redux/modules/usersAttendance';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

describe('[Redux] - EventAttendance: actions', () => {
  it('should create an action when fetching an event attendance', () => {
    const expectedAction = {
      type: eaRedux.FETCHING_ATTENDANCE
    };
    expect(eaRedux.fetchingAttendance()).to.deep.equal(expectedAction);
  });
  
  it('should create an action when failed to fetch an event attendance', () => {
    const error = 'Fetching attendance error';
    const expectedAction = {
      type: eaRedux.FETCHING_ATTENDANCE_ERROR,
      error
    };
    expect(eaRedux.fetchingAttendanceError(error)).to.deep.equal(expectedAction);
  });

  it('should create an action when fetched an event attendance successfully', () => {
    const eventId = '123abcv';
    const count = 1;
    const expectedAction = {
      type: eaRedux.FETCHING_ATTENDANCE_SUCCESS,
      eventId,
      count
    };
    expect(eaRedux.fetchingAttendanceSuccess(eventId, count)).to.deep.equal(expectedAction);
  });
});

describe.skip('[Redux] - EventAttendance: action creators', () => {
  it('creates FETCHING_ATTENDANCE_SUCCESS when fetched an event attendance successfully');
  it('creates FETCHING_ATTENDANCE_ERROR when failed to fetch an event attendance');
});

describe('[Redux] - EventAttendance: reducers', () => {
  it('should return the initial state', () => {
    expect(
      eaRedux.default(undefined, {})
    ).to.deep.equal(
      Map({
        isFetching: false,
        error: ''
      })
    );
  });
  
  it('should handle FETCHING_ATTENDANCE', () => {
    expect(
      eaRedux.default(undefined, {
        type: eaRedux.FETCHING_ATTENDANCE
      })
    ).to.deep.equal(
      Map({
        isFetching: true,
        error: ''
      })
    );
  });
  
  it('should handle FETCHING_ATTENDANCE_SUCCESS', () => {
    const eventId = '123abcv';
    const count = 1;

    expect(
      eaRedux.default(undefined, {
        type: eaRedux.FETCHING_ATTENDANCE_SUCCESS,
        eventId,
        count
      })
    ).to.deep.equal(
      Map({
        isFetching: false,
        error: '',
        [eventId]: count
      })
    );
  });

  it('should handle FETCHING_ATTENDANCE_ERROR', () => {
    const error = 'Fetching attendance error';
    
    expect(
      eaRedux.default(undefined, {
        type: eaRedux.FETCHING_ATTENDANCE_ERROR,
        error
      })
    ).to.deep.equal(
      Map({
        isFetching: false,
        error
      })
    );
  });

  xit('should handle CONFIRM_GOING', () => {
    const eventId = '123asd';
    const count = 1;

    let state = Map({
      isFetching: false,
      error: ''
    });

    state.merge({
      isFetching: false,
      error: '',
      [eventId]: count
    });

    expect(
      eaRedux.default(state, {
        type: uaRedux.CONFIRM_GOING,
        eventId
      })
    ).to.deep.equal(
      Map({
        isFetching: false,
        error: '',
        [eventId]: 2
      })
    );
  });
  
  xit('should handle IM_NOT_GOING', () => {
    const eventId = '123asd';
    const count = 1;

    let state = Map({
      isFetching: false,
      error: ''
    });

    state.merge({
      isFetching: false,
      error: '',
      [eventId]: count
    });

    expect(
      eaRedux.default(state, {
        type: uaRedux.IM_NOT_GOING,
        eventId
      })
    ).to.deep.equal(
      Map({
        isFetching: false,
        error: '',
        [eventId]: 0
      })
    );
  });
});
import { Map } from 'immutable';
import { expect } from 'chai';
import { spy } from 'sinon';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as eaRedux from '../../src/redux/modules/eventAttendance';

describe('[Redux] - EventAttendance: actions', () => {
  it('should create an action when fetching an event attendance');
  it('should create an action when failed to fetch an event attendance');
  it('should create an action when fetched an event attendance successfully');
});

describe.skip('[Redux] - EventAttendance: action creators', () => {
  it('creates FETCHING_ATTENDANCE_SUCCESS when fetched an event attendance successfully');
  it('creates FETCHING_ATTENDANCE_ERROR when failed to fetch an event attendance');
});

describe('[Redux] - EventAttendance: reducers', () => {
  it('should return the initial state');
  it('should handle FETCHING_ATTENDANCE');
  it('should handle FETCHING_ATTENDANCE_SUCCESS');
  it('should handle FETCHING_ATTENDANCE_ERROR');
  it('should handle CONFIRM_GOING');
  it('should handle IM_NOT_GOING');
});
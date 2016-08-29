import { Map } from 'immutable';
import { expect } from 'chai';
import { spy } from 'sinon';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as uaRedux from '../../src/redux/modules/usersAttendance';

describe('[Redux] - UsersAttendance: actions', () => {
  it('should create an action when confirming the user going to an event');
  it('should create an action when confirming the user not going to an event');
  it('should create an action when fetching the event attendance of the user');
  it('should create an action when fetched the event attendance of the user');
  it('should create an action when failed to fetch the event attendance of the user');
});

describe.skip('[Redux] - UsersAttendance: action creators', () => {
  it('handleConfirmAttendance() creates CONFIRM_GOING if the process went successfully');
  it('handleConfirmAttendance() creates IM_NOT_GOING if error occurs');
  it('handleCancelAttendance() creates IM_NOT_GOING if the process went successfully');
  it('handleCancelAttendance() creates CONFIRM_GOING if error occurs');
});

describe('[Redux] - UsersAttendance: reducers', () => {
  it('should return the initial state');
  it('should handle CONFIRM_GOING');
  it('should handle IM_NOT_GOING');
  it('should handle FETCHING_ATTENDANCE');
  it('should handle FETCHING_ATTENDANCE_SUCCESS');
  it('should handle FETCHING_ATTENDANCE_ERROR');
});
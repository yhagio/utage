import { Map } from 'immutable';
import { expect } from 'chai';
import { spy } from 'sinon';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as uaRedux from '../../src/redux/modules/usersAttendance';

describe('[Redux] - UsersAttendance: actions', () => {
  it('should create an action when confirming the user going to an event', () => {
    const eventId = '1234das';
    const expectedAction = {
      type: uaRedux.CONFIRM_GOING,
      eventId
    };
    expect(uaRedux.confirmGoing(eventId)).to.deep.equal(expectedAction);
  });

  it('should create an action when confirming the user not going to an event', () => {
    const eventId = '1234das';
    const expectedAction = {
      type: uaRedux.IM_NOT_GOING,
      eventId
    };
    expect(uaRedux.imNotGoing(eventId)).to.deep.equal(expectedAction);
  });

  it('should create an action when fetching the event attendance of the user', () => {
    const expectedAction = {
      type: uaRedux.FETCHING_ATTENDANCE
    };
    expect(uaRedux.fetchingAttendance()).to.deep.equal(expectedAction);
  });

  it('should create an action when fetched the event attendance of the user', () => {
    const attendance = false;
    const expectedAction = {
      type: uaRedux.FETCHING_ATTENDANCE_SUCCESS,
      attendance
    };
    expect(uaRedux.fetchingAttendanceSuccess(attendance)).to.deep.equal(expectedAction);
  });

  it('should create an action when failed to fetch the event attendance of the user', () => {
    const error = 'Fetching attendance error';
    const expectedAction = {
      type: uaRedux.FETCHING_ATTENDANCE_ERROR,
      error
    };
    expect(uaRedux.fetchingAttendanceError(error)).to.deep.equal(expectedAction);
  });
});

describe.skip('[Redux] - UsersAttendance: action creators', () => {
  it('handleConfirmAttendance() creates CONFIRM_GOING if the process went successfully');
  it('handleConfirmAttendance() creates IM_NOT_GOING if error occurs');
  it('handleCancelAttendance() creates IM_NOT_GOING if the process went successfully');
  it('handleCancelAttendance() creates CONFIRM_GOING if error occurs');
});

describe('[Redux] - UsersAttendance: reducers', () => {
  it('should return the initial state', () => {
    expect(
      uaRedux.default(undefined, {})
    ).to.deep.equal(
      Map({
        isFetching: false,
        error: ''
      })
    );
  });
  
  it('should handle CONFIRM_GOING', () => {
    const state = Map({
      isFetching: false,
      error: ''
    });

    const eventId = '123123fdsf';

    expect(
      uaRedux.default(state, {
        type: uaRedux.CONFIRM_GOING,
        eventId
      })
    ).to.deep.equal(
      state.merge({
        [eventId]: true
      })
    );
  });

  it('should handle IM_NOT_GOING', () => {
    const state = Map({
      isFetching: false,
      error: ''
    });

    const eventId = '123123fdsf';

    expect(
      uaRedux.default(state, {
        type: uaRedux.IM_NOT_GOING,
        eventId
      })
    ).to.deep.equal(
      state.merge({
        [eventId]: false
      })
    );
  });

  it('should handle FETCHING_ATTENDANCE', () => {
    const state = Map({
      isFetching: false,
      error: ''
    });

    expect(
      uaRedux.default(state, {
        type: uaRedux.FETCHING_ATTENDANCE
      })
    ).to.deep.equal(
      state.merge({
        isFetching: true
      })
    );
  });

  it('should handle FETCHING_ATTENDANCE_SUCCESS', () => {
    const state = Map({
      isFetching: false,
      error: ''
    });

    const attendance = { '-werewrew': true };

    expect(
      uaRedux.default(state, {
        type: uaRedux.FETCHING_ATTENDANCE_SUCCESS,
        attendance
      })
    ).to.deep.equal(
      state.merge({
        isFetching: false,
        error: ''
      }).merge(attendance)
    );   
  });
  
  it('should handle FETCHING_ATTENDANCE_ERROR', () => {
    const state = Map({
      isFetching: false,
      error: ''
    });

    const error = 'Fetching attendance error';

    expect(
      uaRedux.default(state, {
        type: uaRedux.FETCHING_ATTENDANCE_ERROR,
        error
      })
    ).to.deep.equal(
      state.merge({
        isFetching: false,
        error
      })
    );   
  });
});
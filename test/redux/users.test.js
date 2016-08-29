import { Map } from 'immutable';
import { expect } from 'chai';
import { spy } from 'sinon';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as usersRedux from '../../src/redux/modules/users';

describe('[Redux] - Users: actions', () => {
  it('should create an action when authenticating the user');
  it('should create an action when unauthenticating the user');
  it('should create an action when fetching the user');
  it('should create an action when fetched the user successfully');
  it('should create an action when failed to fetch the user');
  it('should create an action when stopped fetching the user');
});

describe.skip('[Redux] - Users: action creators', () => {
  it('creates FETCHING_USER_SUCCESS when fetchAndHandleAuthedUser() returns the user');
  it('creates AUTH_USER when fetchAndHandleAuthedUser() sets the authed user');
  it('creates UNAUTH_USER when signoutAndUnauth() went successfully');
});

describe('[Redux] - Users: reducers', () => {
  it('should return the initial state');
  it('should handle AUTH_USER');
  it('should handle UNAUTH_USER');
  it('should handle FETCHING_USER');
  it('should handle FETCHING_USER_SUCCESS');
  it('should handle FETCHING_USER_FAILURE');
  it('should handle STOP_FETCHING_USER');
});
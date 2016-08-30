import { Map } from 'immutable';
import { expect } from 'chai';
import { spy } from 'sinon';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as usersRedux from '../../src/redux/modules/users';

describe('[Redux] - Users: actions', () => {
  it('should create an action when authenticating the user', () => {
    const user = Map({
      name: 'Bob Sapp',
      uid: '123das',
      photoURL: 'www.orearer.co.jp'
    });
    const expectedAction = {
      type: usersRedux.AUTH_USER,
      user
    };
    expect(usersRedux.authUser(user)).to.deep.equal(expectedAction);
  });
  
  it('should create an action when unauthenticating the user', () => {
    const expectedAction = {
      type: usersRedux.UNAUTH_USER
    };
    expect(usersRedux.unauthUser()).to.deep.equal(expectedAction);
  });
  
  it('should create an action when fetching the user', () => {
    const expectedAction = {
      type: usersRedux.FETCHING_USER
    };
    expect(usersRedux.fetchingUser()).to.deep.equal(expectedAction);
  });
  
  it('should create an action when fetched the user successfully', () => {
    const user = {
      name: 'Bob Sapp',
      uid: '123das',
      photoURL: 'www.orearer.co.jp'
    };
    const expectedAction = {
      type: usersRedux.FETCHING_USER_SUCCESS,
      user
    };
    expect(usersRedux.fetchingUserSuccess(user)).to.deep.equal(expectedAction);
  });
  
  it('should create an action when failed to fetch the user', () => {
    const error = 'Error on fetching user';
    const expectedAction = {
      type: usersRedux.FETCHING_USER_FAILURE,
      error
    };
    expect(usersRedux.fetchingUserFailure(error)).to.deep.equal(expectedAction);
  });

  it('should create an action when stopped fetching the user', () => {
    const expectedAction = {
      type: usersRedux.STOP_FETCHING_USER
    };
    expect(usersRedux.stopFetchingUser()).to.deep.equal(expectedAction);
  });
});

describe.skip('[Redux] - Users: action creators', () => {
  it('creates FETCHING_USER_SUCCESS when fetchAndHandleAuthedUser() returns the user');
  it('creates AUTH_USER when fetchAndHandleAuthedUser() sets the authed user');
  it('creates UNAUTH_USER when signoutAndUnauth() went successfully');
});

describe('[Redux] - Users: reducers', () => {
  it('should return the initial state', () => {
    expect(
      usersRedux.default(undefined, {})
    ).to.deep.equal(
      Map({
        isFetching: false,
        error: '',
        isAuthenticated: false,
        authedUser: {}
      })
    );
  });
  
  it('should handle AUTH_USER', () => {
    const authedUser = {
      name: 'Bob Sapp',
      uid: '123das',
      photoURL: 'www.orearer.co.jp'
    };

    const state = Map({
      isFetching: false,
      error: '',
      isAuthenticated: false,
      authedUser: {}
    });

    expect(
      usersRedux.default(state, {
        type: usersRedux.AUTH_USER,
        user: authedUser
      })
    ).to.deep.equal(
      state.merge({
        isAuthenticated: true,
        authedUser
      })
    );
  });

  it('should handle UNAUTH_USER', () => {
    const state = Map({
      isFetching: false,
      error: '',
      isAuthenticated: true,
      authedUser: { uid: '123', name: 'Ali Smith' }
    });

    expect(
      usersRedux.default(state, {
        type: usersRedux.UNAUTH_USER
      })
    ).to.deep.equal(
      state.merge({
        isAuthenticated: false,
        authedUser: {}
      })
    );
  });

  it('should handle FETCHING_USER', () => {
    const state = Map({
      isFetching: false,
      error: '',
      isAuthenticated: false,
      authedUser: {}
    });

    expect(
      usersRedux.default(state, {
        type: usersRedux.FETCHING_USER
      })
    ).to.deep.equal(
      state.merge({
        isFetching: true
      })
    );
  });

  it('should handle FETCHING_USER_SUCCESS', () => {
    const state = Map({
      isFetching: false,
      error: '',
      isAuthenticated: false,
      authedUser: {}
    });

    const authedUser = {
      name: 'Bob Sapp',
      uid: '123das',
      photoURL: 'www.orearer.co.jp'
    };

    expect(
      usersRedux.default(state, {
        type: usersRedux.FETCHING_USER_SUCCESS,
        user: authedUser
      })
    ).to.deep.equal(
      state.merge({
        isFetching: false,
        authedUser
      })
    );
  });

  it('should handle FETCHING_USER_FAILURE', () => {
    const state = Map({
      isFetching: false,
      error: '',
      isAuthenticated: false,
      authedUser: {}
    });

    const error = 'Error on fetching user';

    expect(
      usersRedux.default(state, {
        type: usersRedux.FETCHING_USER_FAILURE,
        error
      })
    ).to.deep.equal(
      state.merge({
        isFetching: false,
        error
      })
    );
  });

  it('should handle STOP_FETCHING_USER', () => {
    const state = Map({
      isFetching: false,
      error: '',
      isAuthenticated: false,
      authedUser: {}
    });

    expect(
      usersRedux.default(state, {
        type: usersRedux.STOP_FETCHING_USER
      })
    ).to.deep.equal(
      state.merge({
        isFetching: false,
      })
    );
  });
});
import { Map } from 'immutable';
import { expect } from 'chai';
import { spy } from 'sinon';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as accountRedux from '../../src/redux/modules/account';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

describe('[Redux] - Account: actions', () => {
  it('should create an action to check the Notification status', () => {
    const bool = true;
    const status = 'granted';
    const expectedAction = {
      type: accountRedux.CHECKED_NOTIFICATION,
      bool,
      status
    };
    expect(accountRedux.checkedNotification(bool, status)).to.deep.equal(expectedAction);
  });

  it('should create an action to update the Notification status', () => {
    const bool = true;
    const status = 'denied';
    const expectedAction = {
      type: accountRedux.UPDATE_NOTIFICATION,
      bool,
      status
    };
    expect(accountRedux.updateNotification(bool, status)).to.deep.equal(expectedAction);
  });
});

describe('[Redux] - Account: action creators', () => {
  it('creates CHECKED_NOTIFICATION when loaded', () => {
    window.Notification = {};
    window.Notification.permission = 'granted';

    const bool = true;
    const status = 'granted';
    const expectedActions = [{
      type: accountRedux.CHECKED_NOTIFICATION,
      bool,
      status
    }];
    const store = mockStore({ });
    store.dispatch(accountRedux.checkNotificationEnabled());
    expect(store.getActions()).to.deep.equal(expectedActions);
  });

  it('creates UPDATE_NOTIFICATION when user changes it', () => {
    const bool = false;
    const status = 'denied';
    const expectedActions = [{
      type: accountRedux.UPDATE_NOTIFICATION,
      bool,
      status
    }];
    const store = mockStore({ });
    store.dispatch(accountRedux.handleUpdateNotification('denied'));
    expect(store.getActions()).to.deep.equal(expectedActions);
  });
});

describe('[Redux] - Account: reducers', () => {
  it('should return the initial state', () => {
    expect(
      accountRedux.default(undefined, {})
    ).to.deep.equal(
      Map({
        notificationEnabled: false,
        status: 'default'
      })
    );
  });

  it('should handle CHECKED_NOTIFICATION', () => {
    expect(
      accountRedux.default(undefined, {
        type: accountRedux.CHECKED_NOTIFICATION,
        bool: true,
        status: 'denied'
      })
    ).to.deep.equal(
      Map({
        notificationEnabled: true,
        status: 'denied'
      })
    );
  });

  it('should handle UPDATE_NOTIFICATION', () => {
    expect(
      accountRedux.default(undefined, {
        type: accountRedux.UPDATE_NOTIFICATION,
        bool: true,
        status: 'granted'
      })
    ).to.deep.equal(
      Map({
        notificationEnabled: true,
        status: 'granted'
      })
    );
  });
});
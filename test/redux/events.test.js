import { Map, fromJS } from 'immutable';
import { expect } from 'chai';
import { spy } from 'sinon';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as eventsRedux from '../../src/redux/modules/events';

describe('[Redux] - Events: actions', () => {
  it('should create an action when fetching the events');
  it('should create an action when fetched the events successfully');
  it('should create an action when failed to fetch the events');
  it('should create an action when filtering the events by the category');
});

describe.skip('[Redux] - Events: action creators', () => {
  it('creates FETCHING_EVENTS_SUCCESS when fetchAndHandleEvents() went successfully');
  it('creates FETCHING_EVENTS_ERROR when failed fetchAndHandleEvents() ');
  it('getFilteredEventIDs() returns the filtered events if the category is passed');
  it('getFilteredEventIDs() returns the base events if no category is passed');
});

describe('[Redux] - Events: reducers', () => {
  it('should return the initial state');
  it('should handle FETCHING_EVENTS');
  it('should handle FETCHING_EVENTS_ERROR');
  it('should handle FETCHING_EVENTS_SUCCESS');
  it('should handle FILTER_EVENTS_CATEGORY');
});
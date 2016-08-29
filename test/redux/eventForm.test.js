import { Map } from 'immutable';
import { expect } from 'chai';
import { spy } from 'sinon';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as eventFormRedux from '../../src/redux/modules/eventForm';

describe('[Redux] - EventForm: actions', () => {
  it('should create an action when updating the title');
  it('should create an action when updating the description');
  it('should create an action when updating the address');
  it('should create an action when updating the price');
  it('should create an action when updating the category');
  it('should create an action when updating the start date');
  it('should create an action when updating the end date');
  it('should create an action when created the event successfully');
  it('should create an action when failed to create the event');
  it('should create an action when got error on updating the tile');
  it('should create an action when got error on updating the description');
  it('should create an action when got error on updating the address');
  it('should create an action when got error on updating the start date');
  it('should create an action when got error on updating the end date');
});

describe.skip('[Redux] - EventForm: action creators', () => {
  it('creates SUBMITTED_SUCCESSFULLY when createEvent() went successfully');
  it('creates SUBMISSION_ERROR when failed createEvent() ');
});

describe('[Redux] - EventForm: reducers', () => {
  it('should return the initial state');
  it('should handle UPDATE_TITLE');
  it('should handle UPDATE_DESCRIPTION');
  it('should handle UPDATE_ADDRESS');
  it('should handle UPDATE_PRICE');
  it('should handle UPDATE_START_DATE');
  it('should handle UPDATE_END_DATE');
  it('should handle UPDATE_CATEGORY');
  it('should handle SUBMITTED_SUCCESSFULLY');
  it('should handle SUBMISSION_ERROR');
  it('should handle TITLE_ERROR');
  it('should handle DESCRIPTION_ERROR');
  it('should handle ADDRESS_ERROR');
  it('should handle START_DATE_ERROR');
  it('should handle END_DATE_ERROR');
});
import { Map } from 'immutable';
import { expect } from 'chai';
import { spy } from 'sinon';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as eeRedux from '../../src/redux/modules/eventEdit';

describe('[Redux] - EventEdit: actions', () => {
  it('should create an action when updating the title');
  it('should create an action when updating the description');
  it('should create an action when updating the address');
  it('should create an action when updating the price');
  it('should create an action when updating the category');
  it('should create an action when updating the start date');
  it('should create an action when updating the end date');
  it('should create an action when updated the event successfully');
  it('should create an action when failed to update the event');
  it('should create an action when got error on updating the tile');
  it('should create an action when got error on updating the description');
  it('should create an action when got error on updating the address');
  it('should create an action when got error on updating the start date');
  it('should create an action when got error on updating the end date');
});

describe.skip('[Redux] - EventEdit: action creators', () => {
  it('creates UPDATED_SUCCESSFULLY when handleUpdateEvent() went successfully');
  it('creates UPDATED_ERROR when failed handleUpdateEvent() ');
  it('creates UPDATED_SUCCESSFULLY when handleDeleteEvent() went successfully');
  it('creates UPDATED_ERROR when failed handleDeleteEvent() ');
});

describe('[Redux] - EventEdit: reducers', () => {
  it('should return the initial state');
  it('should handle EDIT_TITLE');
  it('should handle EDIT_DESCRIPTION');
  it('should handle EDIT_ADDRESS');
  it('should handle EDIT_PRICE');
  it('should handle EDIT_START_DATE');
  it('should handle EDIT_END_DATE');
  it('should handle EDIT_CATEGORY');
  it('should handle UPDATED_SUCCESSFULLY');
  it('should handle UPDATE_ERROR');
  it('should handle TITLE_UPDATE_ERROR');
  it('should handle DESCRIPTION_UPDATE_ERROR');
  it('should handle ADDRESS_UPDATE_ERROR');
  it('should handle START_DATE_UPDATE_ERROR');
  it('should handle END_DATE_UPDATE_ERROR');
});
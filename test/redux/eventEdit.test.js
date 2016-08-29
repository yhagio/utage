import { Map } from 'immutable';
import { expect } from 'chai';
import { spy } from 'sinon';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as eeRedux from '../../src/redux/modules/eventEdit';

describe('[Redux] - EventEdit: actions', () => {
  it('should create an action when updating the title', () => {
    const expectedAction = {
      type: eeRedux.EDIT_TITLE,
      title: 'some title'
    };
    expect(eeRedux.updateTitle('some title')).to.deep.equal(expectedAction);
  });
  
  it('should create an action when updating the description', () => {
    const expectedAction = {
      type: eeRedux.EDIT_DESCRIPTION,
      description: 'some desc'
    };
    expect(eeRedux.updateDescription('some desc')).to.deep.equal(expectedAction);
  });

  it('should create an action when updating the address', () => {
    const expectedAction = {
      type: eeRedux.EDIT_ADDRESS,
      address: 'some 123 street'
    };
    expect(eeRedux.updateAddress('some 123 street')).to.deep.equal(expectedAction);
  });

  it('should create an action when updating the price', () => {
    const expectedAction = {
      type: eeRedux.EDIT_PRICE,
      price: 18
    };
    expect(eeRedux.updatePrice(18)).to.deep.equal(expectedAction);
  });

  it('should create an action when updating the category', () => {
    const expectedAction = {
      type: eeRedux.EDIT_CATEGORY,
      category: 'Birthday'
    };
    expect(eeRedux.updateCategory('Birthday')).to.deep.equal(expectedAction);
  });

  it('should create an action when updating the start date', () => {
    const expectedAction = {
      type: eeRedux.EDIT_START_DATE,
      startDate: '2016-08-30T15:00'
    };
    expect(eeRedux.updateStartDate('2016-08-30T15:00')).to.deep.equal(expectedAction);
  });

  it('should create an action when updating the end date', () => {
    const expectedAction = {
      type: eeRedux.EDIT_END_DATE,
      endDate: '2016-08-30T19:00'
    };
    expect(eeRedux.updateEndDate('2016-08-30T19:00')).to.deep.equal(expectedAction);
  });

  it('should create an action when updated the event successfully', () => {
    const expectedAction = {
      type: eeRedux.UPDATED_SUCCESSFULLY
    };
    expect(eeRedux.submittedSuccessfully()).to.deep.equal(expectedAction);
  });

  it('should create an action when failed to update the event', () => {
    const expectedAction = {
      type: eeRedux.UPDATE_ERROR,
      error: 'Some error'
    };
    expect(eeRedux.submissionError('Some error')).to.deep.equal(expectedAction);
  });

  it('should create an action when got error on updating the tile', () => {
    const expectedAction = {
      type: eeRedux.TITLE_UPDATE_ERROR,
      titleError: 'Title is required'
    };
    expect(eeRedux.warnTitleError()).to.deep.equal(expectedAction);
  });

  it('should create an action when got error on updating the description', () => {
    const expectedAction = {
      type: eeRedux.DESCRIPTION_UPDATE_ERROR,
      descriptionError: 'Description is required'
    };
    expect(eeRedux.warnDescriptionError()).to.deep.equal(expectedAction);
  });

  it('should create an action when got error on updating the address', () => {
    const expectedAction = {
      type: eeRedux.ADDRESS_UPDATE_ERROR,
      addressError: 'Address is required'
    };
    expect(eeRedux.warnAddressError()).to.deep.equal(expectedAction);
  });

  it('should create an action when got error on updating the start date', () => {
    const expectedAction = {
      type: eeRedux.START_DATE_UPDATE_ERROR,
      startDateError: 'Start Date is required'
    };
    expect(eeRedux.warnStartDateError()).to.deep.equal(expectedAction);
  });

  it('should create an action when got error on updating the end date', () => {
    const expectedAction = {
      type: eeRedux.END_DATE_UPDATE_ERROR,
      endDateError: 'End Date is required'
    };
    expect(eeRedux.warnEndDateError()).to.deep.equal(expectedAction); 
  });
});

describe.skip('[Redux] - EventEdit: action creators', () => {
  it('creates UPDATED_SUCCESSFULLY when handleUpdateEvent() went successfully');
  it('creates UPDATED_ERROR when failed handleUpdateEvent() ');
  it('creates UPDATED_SUCCESSFULLY when handleDeleteEvent() went successfully');
  it('creates UPDATED_ERROR when failed handleDeleteEvent() ');
});

describe('[Redux] - EventEdit: reducers', () => {
  it('should return the initial state', () => {
    expect(
      eeRedux.default(undefined, {})
    ).to.deep.equal(
      Map({
        title: '',
        description: '',
        address: '',
        price: 0,
        startDate: '',
        endDate: '',
        category: 'Social',
        error: '',
        titleError: '',
        descriptionError: '',
        addressError: '',
        startDateError: '',
        endDateError: ''
      })
    );
  });
  
  it('should handle EDIT_TITLE', () => {
    const title = 'aww title';

    expect(
      eeRedux.default(undefined, {
        type: eeRedux.EDIT_TITLE,
        title
      })
    ).to.deep.equal(
      Map({
        title,
        description: '',
        address: '',
        price: 0,
        startDate: '',
        endDate: '',
        category: 'Social',
        error: '',
        titleError: '',
        descriptionError: '',
        addressError: '',
        startDateError: '',
        endDateError: ''
      })
    );
  });

  it('should handle EDIT_DESCRIPTION', () => {
    const description = 'aww description';

    expect(
      eeRedux.default(undefined, {
        type: eeRedux.EDIT_DESCRIPTION,
        description
      })
    ).to.deep.equal(
      Map({
        title: '',
        description,
        address: '',
        price: 0,
        startDate: '',
        endDate: '',
        category: 'Social',
        error: '',
        titleError: '',
        descriptionError: '',
        addressError: '',
        startDateError: '',
        endDateError: ''
      })
    );
  });

  it('should handle EDIT_ADDRESS', () => {
    const address = 'aww address';

    expect(
      eeRedux.default(undefined, {
        type: eeRedux.EDIT_ADDRESS,
        address
      })
    ).to.deep.equal(
      Map({
        title: '',
        description: '',
        address,
        price: 0,
        startDate: '',
        endDate: '',
        category: 'Social',
        error: '',
        titleError: '',
        descriptionError: '',
        addressError: '',
        startDateError: '',
        endDateError: ''
      })
    );
  });

  it('should handle EDIT_PRICE', () => {
    const price = 90;

    expect(
      eeRedux.default(undefined, {
        type: eeRedux.EDIT_PRICE,
        price
      })
    ).to.deep.equal(
      Map({
        title: '',
        description: '',
        address: '',
        price,
        startDate: '',
        endDate: '',
        category: 'Social',
        error: '',
        titleError: '',
        descriptionError: '',
        addressError: '',
        startDateError: '',
        endDateError: ''
      })
    );
  });

  it('should handle EDIT_START_DATE', () => {
    const startDate = '2016-08-30T19:00';

    expect(
      eeRedux.default(undefined, {
        type: eeRedux.EDIT_START_DATE,
        startDate
      })
    ).to.deep.equal(
      Map({
        title: '',
        description: '',
        address: '',
        price: 0,
        startDate,
        endDate: '',
        category: 'Social',
        error: '',
        titleError: '',
        descriptionError: '',
        addressError: '',
        startDateError: '',
        endDateError: ''
      })
    );
  });

  it('should handle EDIT_END_DATE', () => {
    const endDate = '2016-08-30T19:00';

    expect(
      eeRedux.default(undefined, {
        type: eeRedux.EDIT_END_DATE,
        endDate
      })
    ).to.deep.equal(
      Map({
        title: '',
        description: '',
        address: '',
        price: 0,
        startDate: '',
        endDate,
        category: 'Social',
        error: '',
        titleError: '',
        descriptionError: '',
        addressError: '',
        startDateError: '',
        endDateError: ''
      })
    );
  });

  it('should handle EDIT_CATEGORY', () => {
    const category = 'Conference';

    expect(
      eeRedux.default(undefined, {
        type: eeRedux.EDIT_CATEGORY,
        category
      })
    ).to.deep.equal(
      Map({
        title: '',
        description: '',
        address: '',
        price: 0,
        startDate: '',
        endDate: '',
        category,
        error: '',
        titleError: '',
        descriptionError: '',
        addressError: '',
        startDateError: '',
        endDateError: ''
      })
    );
  });

  it('should handle UPDATED_SUCCESSFULLY', () => {
    expect(
      eeRedux.default(undefined, {
        type: eeRedux.UPDATED_SUCCESSFULLY
      })
    ).to.deep.equal(
      Map({
        title: '',
        description: '',
        address: '',
        price: 0,
        startDate: '',
        endDate: '',
        category: '',
        error: '',
        titleError: '',
        descriptionError: '',
        addressError: '',
        startDateError: '',
        endDateError: ''
      })
    );
  });
  
  it('should handle UPDATE_ERROR', () => {
    const error = 'Some error';

    expect(
      eeRedux.default(undefined, {
        type: eeRedux.UPDATE_ERROR,
        error
      })
    ).to.deep.equal(
      Map({
        title: '',
        description: '',
        address: '',
        price: 0,
        startDate: '',
        endDate: '',
        category: 'Social',
        error,
        titleError: '',
        descriptionError: '',
        addressError: '',
        startDateError: '',
        endDateError: ''
      })
    );
  });

  it('should handle TITLE_UPDATE_ERROR', () => {
    const titleError = 'Title is required';

    expect(
      eeRedux.default(undefined, {
        type: eeRedux.TITLE_UPDATE_ERROR,
        titleError
      })
    ).to.deep.equal(
      Map({
        title: '',
        description: '',
        address: '',
        price: 0,
        startDate: '',
        endDate: '',
        category: 'Social',
        error: '',
        titleError,
        descriptionError: '',
        addressError: '',
        startDateError: '',
        endDateError: ''
      })
    );
  });
  
  it('should handle DESCRIPTION_UPDATE_ERROR', () => {
    const descriptionError = 'Description is required';

    expect(
      eeRedux.default(undefined, {
        type: eeRedux.DESCRIPTION_UPDATE_ERROR,
        descriptionError
      })
    ).to.deep.equal(
      Map({
        title: '',
        description: '',
        address: '',
        price: 0,
        startDate: '',
        endDate: '',
        category: 'Social',
        error: '',
        titleError: '',
        descriptionError,
        addressError: '',
        startDateError: '',
        endDateError: ''
      })
    );
  });

  it('should handle ADDRESS_UPDATE_ERROR', () => {
    const addressError = 'Address is required';

    expect(
      eeRedux.default(undefined, {
        type: eeRedux.ADDRESS_UPDATE_ERROR,
        addressError
      })
    ).to.deep.equal(
      Map({
        title: '',
        description: '',
        address: '',
        price: 0,
        startDate: '',
        endDate: '',
        category: 'Social',
        error: '',
        titleError: '',
        descriptionError: '',
        addressError,
        startDateError: '',
        endDateError: ''
      })
    );
  });

  it('should handle START_DATE_UPDATE_ERROR', () => {
    const startDateError = 'Start Date is required';

    expect(
      eeRedux.default(undefined, {
        type: eeRedux.START_DATE_UPDATE_ERROR,
        startDateError
      })
    ).to.deep.equal(
      Map({
        title: '',
        description: '',
        address: '',
        price: 0,
        startDate: '',
        endDate: '',
        category: 'Social',
        error: '',
        titleError: '',
        descriptionError: '',
        addressError: '',
        startDateError,
        endDateError: ''
      })
    );
  });

  it('should handle END_DATE_UPDATE_ERROR', () => {
    const endDateError = 'End Date is required';

    expect(
      eeRedux.default(undefined, {
        type: eeRedux.END_DATE_UPDATE_ERROR,
        endDateError
      })
    ).to.deep.equal(
      Map({
        title: '',
        description: '',
        address: '',
        price: 0,
        startDate: '',
        endDate: '',
        category: 'Social',
        error: '',
        titleError: '',
        descriptionError: '',
        addressError: '',
        startDateError: '',
        endDateError
      })
    );
  });
});
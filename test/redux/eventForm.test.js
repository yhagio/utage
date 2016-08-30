import { Map } from 'immutable';
import { expect } from 'chai';
import { spy } from 'sinon';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as eventFormRedux from '../../src/redux/modules/eventForm';

describe('[Redux] - EventForm: actions', () => {
  it('should create an action when updating the title', () => {
    const expectedAction = {
      type: eventFormRedux.UPDATE_TITLE,
      title: 'some title'
    };
    expect(eventFormRedux.updateTitle('some title')).to.deep.equal(expectedAction);
  });

  it('should create an action when updating the description', () => {
    const expectedAction = {
      type: eventFormRedux.UPDATE_DESCRIPTION,
      description: 'some description'
    };
    expect(eventFormRedux.updateDescription('some description')).to.deep.equal(expectedAction);
  });

  it('should create an action when updating the address', () => {
    const expectedAction = {
      type: eventFormRedux.UPDATE_ADDRESS,
      address: 'some address'
    };
    expect(eventFormRedux.updateAddress('some address')).to.deep.equal(expectedAction);
  });

  it('should create an action when updating the price', () => {
    const expectedAction = {
      type: eventFormRedux.UPDATE_PRICE,
      price: 90
    };
    expect(eventFormRedux.updatePrice(90)).to.deep.equal(expectedAction);
  });

  it('should create an action when updating the category', () => {
    const expectedAction = {
      type: eventFormRedux.UPDATE_CATEGORY,
      category: 'Birthday'
    };
    expect(eventFormRedux.updateCategory('Birthday')).to.deep.equal(expectedAction);
  });

  it('should create an action when updating the start date', () => {
    const expectedAction = {
      type: eventFormRedux.UPDATE_START_DATE,
      startDate: '2016-08-30T15:00'
    };
    expect(eventFormRedux.updateStartDate('2016-08-30T15:00')).to.deep.equal(expectedAction);
  });

  it('should create an action when updating the end date', () => {
    const expectedAction = {
      type: eventFormRedux.UPDATE_END_DATE,
      endDate: '2016-08-30T15:00'
    };
    expect(eventFormRedux.updateEndDate('2016-08-30T15:00')).to.deep.equal(expectedAction);
  });

  it('should create an action when created the event successfully', () => {
    const expectedAction = {
      type: eventFormRedux.SUBMITTED_SUCCESSFULLY
    };
    expect(eventFormRedux.submittedSuccessfully()).to.deep.equal(expectedAction);
  });
  
  it('should create an action when failed to create the event', () => {
    const expectedAction = {
      type: eventFormRedux.SUBMISSION_ERROR,
      error: 'Submision failed'
    };
    expect(eventFormRedux.submissionError('Submision failed')).to.deep.equal(expectedAction);
  });

  it('should create an action when got error on updating the tile', () => {
    const expectedAction = {
      type: eventFormRedux.TITLE_ERROR,
      titleError: 'Title is required'
    };
    expect(eventFormRedux.warnTitleError('Title is required')).to.deep.equal(expectedAction);
  });

  it('should create an action when got error on updating the description', () => {
    const expectedAction = {
      type: eventFormRedux.DESCRIPTION_ERROR,
      descriptionError: 'Description is required'
    };
    expect(eventFormRedux.warnDescriptionError('Description is required')).to.deep.equal(expectedAction);
  });

  it('should create an action when got error on updating the address', () => {
    const expectedAction = {
      type: eventFormRedux.ADDRESS_ERROR,
      addressError: 'Address is required'
    };
    expect(eventFormRedux.warnAddressError('Address is required')).to.deep.equal(expectedAction);
  });

  it('should create an action when got error on updating the start date', () => {
    const expectedAction = {
      type: eventFormRedux.START_DATE_ERROR,
      startDateError: 'Start Date is required'
    };
    expect(eventFormRedux.warnStartDateError('Start Date is required')).to.deep.equal(expectedAction);
  });

  it('should create an action when got error on updating the end date', () => {
    const expectedAction = {
      type: eventFormRedux.END_DATE_ERROR,
      endDateError: 'End Date is required'
    };
    expect(eventFormRedux.warnEndDateError('End Date is required')).to.deep.equal(expectedAction);
  });
});

describe.skip('[Redux] - EventForm: action creators', () => {
  it('creates SUBMITTED_SUCCESSFULLY when createEvent() went successfully');
  it('creates SUBMISSION_ERROR when failed createEvent() ');
});

describe('[Redux] - EventForm: reducers', () => {
  it('should return the initial state', () => {
    expect(
      eventFormRedux.default(undefined, {})
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

  it('should handle UPDATE_TITLE', () => {
    const title = 'aww title';

    expect(
      eventFormRedux.default(undefined, {
        type: eventFormRedux.UPDATE_TITLE,
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
  
  it('should handle UPDATE_DESCRIPTION', () => {
    const description = 'aww title';

    expect(
      eventFormRedux.default(undefined, {
        type: eventFormRedux.UPDATE_DESCRIPTION,
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

  it('should handle UPDATE_ADDRESS', () => {
    const address = 'aww title';

    expect(
      eventFormRedux.default(undefined, {
        type: eventFormRedux.UPDATE_ADDRESS,
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

  it('should handle UPDATE_PRICE', () => {
    const price = 98;

    expect(
      eventFormRedux.default(undefined, {
        type: eventFormRedux.UPDATE_PRICE,
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
  
  it('should handle UPDATE_START_DATE', () => {
    const startDate = '2016-08-30T15:00';

    expect(
      eventFormRedux.default(undefined, {
        type: eventFormRedux.UPDATE_START_DATE,
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

  it('should handle UPDATE_END_DATE', () => {
    const endDate = '2016-08-30T15:00';

    expect(
      eventFormRedux.default(undefined, {
        type: eventFormRedux.UPDATE_END_DATE,
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

  it('should handle UPDATE_CATEGORY', () => {
    const category = 'Conference';

    expect(
      eventFormRedux.default(undefined, {
        type: eventFormRedux.UPDATE_CATEGORY,
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

  it('should handle SUBMITTED_SUCCESSFULLY', () => {
    expect(
      eventFormRedux.default(undefined, {
        type: eventFormRedux.SUBMITTED_SUCCESSFULLY
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

  it('should handle SUBMISSION_ERROR', () => {
    const error = 'Submision failed';

    expect(
      eventFormRedux.default(undefined, {
        type: eventFormRedux.SUBMISSION_ERROR,
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

  it('should handle TITLE_ERROR', () => {
    const titleError = 'Title is required';

    expect(
      eventFormRedux.default(undefined, {
        type: eventFormRedux.TITLE_ERROR,
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

  it('should handle DESCRIPTION_ERROR', () => {
    const descriptionError = 'Description is required';

    expect(
      eventFormRedux.default(undefined, {
        type: eventFormRedux.DESCRIPTION_ERROR,
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

  it('should handle ADDRESS_ERROR', () => {
    const addressError = 'Address is required';

    expect(
      eventFormRedux.default(undefined, {
        type: eventFormRedux.ADDRESS_ERROR,
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

  it('should handle START_DATE_ERROR', () => {
    const startDateError = 'Start Date is required';

    expect(
      eventFormRedux.default(undefined, {
        type: eventFormRedux.START_DATE_ERROR,
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

  it('should handle END_DATE_ERROR', () => {
    const endDateError = 'End Date is required';

    expect(
      eventFormRedux.default(undefined, {
        type: eventFormRedux.END_DATE_ERROR,
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
import React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { shallow } from 'enzyme';
import NewEventForm, { SubmitButton } from '../../src/components/NewEvent/NewEvent';

describe('Component: NewEventForm', () => {
  const updateTitle = spy(); 
  const updateDescription = spy();
  const updateAddress = spy();
  const updatePrice = spy();
  const updateStartDate = spy();
  const updateEndDate = spy();
  const updateCategory = spy();
  const createEvent = spy();

  const warnTitleError = spy();
  const warnDescriptionError = spy();
  const warnAddressError = spy();
  const warnStartDateError = spy();
  const warnEndDateError = spy();

  const authedUser = {
    uid: '12345',
    name: 'Yo Bro',
    photoURL : 'https://www.whateva.co.jp'
  };

  let wrapper;
  before(() => {
    wrapper = shallow(
      <NewEventForm
        authedUser={ authedUser }
        updateTitle={ updateTitle }
        updateDescription={ updateDescription }
        updateAddress={ updateAddress }
        updatePrice={ updatePrice }
        updateStartDate={ updateStartDate }
        updateEndDate={ updateEndDate }
        updateCategory={ updateCategory }

        title=''
        description=''
        address=''
        price={ 0 }
        startDate=''
        endDate=''
        category=''
        error=''
        createEvent={ createEvent }

        titleError=''
        warnTitleError={ warnTitleError }
        descriptionError=''
        warnDescriptionError={ warnDescriptionError }
        addressError=''
        warnAddressError={ warnAddressError }
        startDateError=''
        warnStartDateError={ warnStartDateError }
        endDateError=''
        warnEndDateError={ warnEndDateError } />)
  });

  it('displays the correct form', () => {
    expect(wrapper.find('h2').text()).to.equal('New Event');
  });

  it('handles the description change', () => {
    wrapper.find('#description').simulate('change', {target: {value: 'Awesome description'}});
    expect(updateDescription.calledWith('Awesome description')).to.be.true;
  });

  it('handles the address change', () => {
    wrapper.find('#address').simulate('change', {target: {value: 'Awesome address 123'}});
    expect(updateAddress.calledWith('Awesome address 123')).to.be.true;
  });

  it('handles the price change', () => {
    wrapper.find('#price').simulate('change', {target: {value: 10}});
    expect(updatePrice.calledWith(10)).to.be.true;
  });

  it('handles the startDate change', () => {
    wrapper.find('#startDate').simulate('change', {target: {value: '2016-08-30T15:00'}});
    expect(updateStartDate.calledWith('2016-08-30T15:00')).to.be.true;
  });

  it('handles the endDate change', () => {
    wrapper.find('#endDate').simulate('change', {target: {value: '2016-08-30T15:30'}});
    expect(updateEndDate.calledWith('2016-08-30T15:30')).to.be.true;
  });

  it('handles the category change', () => {
    wrapper.find('#category').simulate('change', {target: {value: 'Birthday'}});
    expect(updateCategory.calledWith('Birthday')).to.be.true;
  });

  it('warns if the title does not have any value', () => {
    wrapper.find('#title').simulate('blur', {target: {value: ''}});
    expect(warnTitleError.calledWith('')).to.be.true;
  });

  it('warns if the description does not have any value', () => {
    wrapper.find('#description').simulate('blur', {target: {value: ''}});
    expect(warnDescriptionError.calledWith('')).to.be.true;
  });

  it('warns if the address does not have any value', () => {
    wrapper.find('#address').simulate('blur', {target: {value: ''}});
    expect(warnAddressError.calledWith('')).to.be.true;
  });

  it('warns if the startDate does not have any value', () => {
    wrapper.find('#startDate').simulate('blur', {target: {value: ''}});
    expect(warnStartDateError.calledWith('')).to.be.true;
  });

  it('warns if the endDate does not have any value', () => {
    wrapper.find('#endDate').simulate('blur', {target: {value: ''}});
    expect(warnEndDateError.calledWith('')).to.be.true;
  });

  it('can submit if all inputs are filled', () => {
    wrapper.find('form').simulate('submit', { preventDefault() {}, uid: 'uid', title: 'title', description: 'description', address: 'address', startDate: 'aaa', endDate: 'bbb', category: 'Social' } );
    expect(createEvent.called).to.be.true;
  });
});

describe('Component: NewEventForm > SubmitButton', () => {

  it('If no error, "Submit" is displayed', () => {
    const wrapper = shallow(
      <SubmitButton
        titleError=''
        descriptionError=''
        addressError=''
        startDateError=''
        endDateError=''/>
    );
    expect(wrapper.text()).to.equal('Submit');
  });

  it('If error, "Cannot Submit" is displayed', () => {
    const wrapper = shallow(
      <SubmitButton
        titleError='error'
        descriptionError='error'
        addressError='error'
        startDateError='error'
        endDateError='error'/>
    );
    expect(wrapper.text()).to.equal('Cannot Submit');
  });

});

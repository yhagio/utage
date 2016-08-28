import React from 'react';
import { Map } from 'immutable';
import { expect } from 'chai';
import { spy } from 'sinon';
import { shallow } from 'enzyme';
import EventEdit, { SubmitButton } from '../../src/components/EventEdit/EventEdit';

describe('Component: EventEdit', () => {
  const updateTitle = spy(); 
  const updateDescription = spy();
  const updateAddress = spy();
  const updatePrice = spy();
  const updateStartDate = spy();
  const updateEndDate = spy();
  const updateCategory = spy();
  
  const handleUpdateEvent = spy();
  const handleDeleteEvent = spy();

  const warnTitleError = spy();
  const warnDescriptionError = spy();
  const warnAddressError = spy();
  const warnStartDateError = spy();
  const warnEndDateError = spy();

  const eventHost = Map({
    uid: '12345',
    name: 'Yo Bro',
    photoURL : 'https://www.whateva.co.jp'
    // ,get(arg) {
    //   return this[arg]
    // }
  });

  const event = Map({
    eventId: '123abc',
    title: 'Original Title',
    description: 'Original Desc',
    price: 100,
    category: 'Birthday',
    address: 'Original 123 street',
    startDate: '2016-08-30T15:00',
    endDate: '2016-08-30T15:30'
    ,get(arg) {
      return this[arg]
    }
  });
  
  // console.log('Event Title', event.get('title'));

  let wrapper;
  before(() => {
    wrapper = shallow(
      <EventEdit
        event={ event }
        eventHost={ eventHost }
        updateTitle={ updateTitle }
        updateDescription={ updateDescription }
        updateAddress={ updateAddress }
        updatePrice={ updatePrice }
        updateStartDate={ updateStartDate }
        updateEndDate={ updateEndDate }
        updateCategory={ updateCategory }

        title={ event.get('title') }
        description={ event.get('description') }
        address={ event.get('address') }
        price={ event.get('price') }
        startDate={ event.get('startDate') }
        endDate={ event.get('endDate') }
        category={ event.get('category') }

        isFetching={ false }
        error=''
        
        handleUpdateEvent={ handleUpdateEvent }
        handleDeleteEvent={ handleDeleteEvent }

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

  it('displays the correct page', () => {
    expect(wrapper.find('h2').at(0).text()).to.equal('Edit Event');
  });

  it('update the title', () => {
    wrapper.find('#title').simulate('change', {target: {value: 'Awesome Title'}});
    expect(updateTitle.calledWith('Awesome Title')).to.be.true;
  });

  it('warns if the title is empty', () => {
    wrapper.find('#title').simulate('blur', {target: {value: ''}});
    expect(warnTitleError.calledWith('')).to.be.true;
  });

  it('update the description', () => {
    wrapper.find('#description').simulate('change', {target: {value: 'Awesome Description'}});
    expect(updateDescription.calledWith('Awesome Description')).to.be.true;
  });

  it('warns if the description is empty', () => {
    wrapper.find('#description').simulate('blur', {target: {value: ''}});
    expect(warnDescriptionError.calledWith('')).to.be.true;
  });

  it('update the price', () => {
    wrapper.find('#price').simulate('change', {target: {value: 907}});
    expect(updatePrice.calledWith(907)).to.be.true;
  });

  it('update the address', () => {
    wrapper.find('#address').simulate('change', {target: {value: 'Awesome Address'}});
    expect(updateAddress.calledWith('Awesome Address')).to.be.true;
  });

  it('warns if the address is empty', () => {
    wrapper.find('#address').simulate('blur', {target: {value: ''}});
    expect(warnAddressError.calledWith('')).to.be.true;
  });

  it('update the startDate', () => {
    wrapper.find('#startDate').simulate('change', {target: {value: '2016-08-30T15:50'}});
    expect(updateStartDate.calledWith('2016-08-30T15:50')).to.be.true;
  });

  it('warns if the startDate is empty', () => {
    wrapper.find('#startDate').simulate('blur', {target: {value: ''}});
    expect(warnStartDateError.calledWith('')).to.be.true;
  });

  it('update the endDate', () => {
    wrapper.find('#endDate').simulate('change', {target: {value: '2016-09-30T15:00'}});
    expect(updateEndDate.calledWith('2016-09-30T15:00')).to.be.true;
  });

  it('warns if the endDate is empty', () => {
    wrapper.find('#endDate').simulate('blur', {target: {value: ''}});
    expect(warnEndDateError.calledWith('')).to.be.true;
  });

  it('update the category', () => {
    wrapper.find('#category').simulate('change', {target: {value: 'Social'}});
    expect(updateCategory.calledWith('Social')).to.be.true;
  });

  it('can update if all fields are filled', () => {
    wrapper.find('form').simulate('submit', { preventDefault() {} });      
    expect(handleUpdateEvent.calledOnce).to.be.true;
  });

  it('can delete on clicking delete button', () => {
    wrapper.find('#delete').simulate('click', { preventDefault() {} });
    expect(handleDeleteEvent.calledOnce).to.be.true;
  });

  it('displays loading message when it is loading', () => {
    let wrapper2;  
    wrapper2 = shallow(
      <EventEdit
        eventHost={ eventHost }
        updateTitle={ updateTitle }
        updateDescription={ updateDescription }
        updateAddress={ updateAddress }
        updatePrice={ updatePrice }
        updateStartDate={ updateStartDate }
        updateEndDate={ updateEndDate }
        updateCategory={ updateCategory }

        title={ event.get('title') }
        description={ event.get('description') }
        address={ event.get('address') }
        price={ event.get('price') }
        startDate={ event.get('startDate') }
        endDate={ event.get('endDate') }
        category={ event.get('category') }

        isFetching={ true }
        error=''
        
        handleUpdateEvent={ handleUpdateEvent }
        handleDeleteEvent={ handleDeleteEvent }

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
    expect(wrapper2.find('h2').at(0).text()).to.equal('Loading event data');
  });
});

describe('Component: SubmitButton', () => {
  it('if errors, cannot update', () => {
    const wrapper = shallow(
      <SubmitButton
        titleError='error'
        descriptionError='error'
        addressError='error'
        startDateError='error'
        endDateError='error'/>
    );
    expect(wrapper.text()).to.equal('Cannot Update');
  });

  it('if no errors, can update', () => {
    const wrapper = shallow(
      <SubmitButton
        titleError=''
        descriptionError=''
        addressError=''
        startDateError=''
        endDateError=''/>
    );
    expect(wrapper.text()).to.equal('Update');
  });
});
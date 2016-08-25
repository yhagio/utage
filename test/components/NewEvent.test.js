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
  const updateLimit = spy();
  const updateStartDate = spy();
  const updateEndDate = spy();
  const updateCategory = spy();
  const createEvent = spy();

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
        updateLimit={ updateLimit }
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
        warnTitleError={ undefined }
        descriptionError=''
        warnDescriptionError={ undefined }
        addressError=''
        warnAddressError={ undefined }
        startDateError=''
        warnStartDateError={ undefined }
        endDateError=''
        warnEndDateError={ undefined } />)
  });

  it('displays the correct form', () => {
    expect(wrapper.find('h2').text()).to.equal('New Event');
  });

  it('handles the title change', () => {
    wrapper.find('#title').simulate('change', {target: {value: 'Awesome Title'}});
    expect(updateTitle.calledWith('Awesome Title')).to.be.true;
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
